import toast from '../../components/toast/toast'

export default function (Vue, options) {
  const Toast = Vue.extend(toast);
  let instance;
  const DEFAULT = {
    duration : 2000
  };

  Vue.prototype.$toast = function (text, opts) {
    opts = Object.assign({}, DEFAULT, opts);
    if(!instance){
      instance = new Toast({
        el : document.createElement('div')
      })
      document.body.appendChild(instance.$el);
    }

    Vue.nextTick(()=>{
      instance.visible = true;
      instance.text = text;
      setTimeout(()=>{
        instance.visible = false;
      }, opts.duration);
    })
  }
}
