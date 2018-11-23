'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

//图片雪碧图
const SpritesmithPlugin = require('webpack-spritesmith');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//雪碧图样式生产模板
const templateFunction = function (data) {
  // console.log(data.sprites);
  const shared = '.u-icon { background-image: url(I); zoom:0.4}'
    .replace('I', data.sprites[0].image);
  // 注意：此处默认图标使用的是二倍图
  const perSprite = data.sprites.map(function (sprite) {
    // background-size: SWpx SHpx;
    return '.u-icon-N{ width: Wpx; height: Hpx; background-position: Xpx Ypx; } '
      .replace(/N/g, sprite.name)
      .replace(/SW/g, sprite.width / 2)
      .replace(/SH/g, sprite.height / 2)
      .replace(/W/g, sprite.width)
      .replace(/H/g, sprite.height)
      .replace(/X/g, sprite.offset_x)
      .replace(/Y/g, sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
};


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    // 雪碧图设置
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/assets/images/icons/'), // 图标根路径
        glob: '**/*.png' // 匹配任意 png 图标
      },
      target: {
        image: path.resolve(__dirname, '../src/assets/css/sprites.png'), // 生成雪碧图目标路径与名称
        // 设置生成CSS背景及其定位的文件或方式
        css: [
          [path.resolve(__dirname, '../src/assets/css/sprites.css'), {
            format: 'function_based_template'
          }]
        ]
      },
      customTemplates: {
        'function_based_template': templateFunction,
      },
      apiOptions: {
        cssImageRef: "./sprites.png", // css文件中引用雪碧图的相对位置路径配置
      },
      spritesmithOptions: {
        padding: 20,
      }
    })

  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
