import alertbox from '../../components/alertComfirm/alert'

export default function (Vue, options) {
  let AlertBox = Vue.extend(alertbox);
  let instance;
  const DEFAULT = {
    title : '提示',
    btnSureText : '确定',
    btnCancelText : '取消'
  };

  Vue.prototype.$alert = function (text, opts) {
    opts = Object.assign({}, DEFAULT, opts);
    if(!instance){
      instance = new AlertBox({
        el : document.createElement('div')
      });
      document.body.appendChild(instance.$el)
    }
    Vue.nextTick(()=>{
      instance.visible = true;
      instance.text = text;
      instance.title = opts.title;
      instance.buttons = [{
        btnText : opts.btnSureText,
        event(){
          instance.visible = false;
          opts.sureEvent && opts.sureEvent();
        }
      }]
    })
  }

  Vue.prototype.$confirm = function (text, opts) {
    opts = Object.assign({}, DEFAULT, opts);
    if(!instance){
      instance = new AlertBox({
        el : document.createElement('div')
      });
      document.body.appendChild(instance.$el)
    }
    Vue.nextTick(()=>{
      instance.visible = true;
      instance.text = text;
      instance.title = opts.title;
      instance.buttons = [
        {
          btnText : opts.btnSureText,
          event(){
            instance.visible = false;
            opts.sureEvent && opts.sureEvent();
          }
        },
        {
          btnText : opts.btnCancelText,
          event(){
            instance.visible = false;
            opts.cancelEvent && opts.cancelEvent();
          }
        }
      ]
    })
  }
}
