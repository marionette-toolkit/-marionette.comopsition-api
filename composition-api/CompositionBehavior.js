import { Behavior } from 'backbone.marionette'
import { callWith } from './contexts'

function setupWrapper(instance, setupFn, args) {
    const ret = callWith(instance, setupFn.bind(instance), args);
    return ret;
}


const CompositionBehavior = Behavior.extend({

    initialize() {
        // setup을 wrapping하고 바로 수행한다.


        if (this.view.setup && typeof this.view.setup === 'function') {
            const ret = setupWrapper(this.view, this.view.setup, this.view.options);
            if (ret) {
                Object.assign(this.view, ret)
            }
        }
    },
    onRender() {
        // bind 함수를 실행한다. (onbind nono..)
        if (this.view.bind && typeof this.view.bind === 'function') {
            setupWrapper(this.view, this.view.bind)
        }
    },
    onDestroy() {

        // 숨겨두고
        // ref로해가지고 다 null로만들어버린다.
        // this.view.ref = null;


        // console.log('destryor')
        // if (this.view.ref) {
        //     console.log('refs')
        //     this.view.ref["__$__revoke__$__"] = "0"
        //     this.view.ref = null;
        // }
    }

})

export default CompositionBehavior;
