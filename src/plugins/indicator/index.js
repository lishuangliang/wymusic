import indicator from '../../components/indicator/indicator'

export default function (Vue, options) {
  const Indicator = Vue.extend(indicator);
  let instance;

  Vue.prototype.$indicator = {
    open (text, opts){
      if(!instance){
        instance = new Indicator({
          el : document.createElement('div')
        })
        document.body.appendChild(instance.$el);

      }

      Vue.nextTick(()=>{
        instance.text = text || '';
        instance.visible = true;

        if(opts && opts.maxWaitTime){
          setTimeout(()=>{
            if( instance.visible){
              instance.visible = false;
              opts.callback && opts.callback();
            }
          }, 1000 * opts.maxWaitTime)
        }

      });

    },
    close(){
      if (instance) {
        Vue.nextTick(() => {
          instance.visible = false;
        });
      }
    }
  }


}
