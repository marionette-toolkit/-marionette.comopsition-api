import { getCurrentActiveFn, getCurrentView, callWith } from './contexts';
import { Model } from 'backbone';

export function reactive(target) {
    const view = getCurrentView();
    if (!view) return;
    if (!view.model) {
        view.model = new Model()
    }
    view.model.set(target, { silent: true });
    const proxy = new Proxy(
        target,
        {
            get(target, key, receiver) {
                const res = Reflect.get(target, key, receiver);
                track(target, key)
                return res;
            },
            set(target, key, value, receiver) {
                const oldValue = target[key];
                const res = Reflect.set(target, key, value, receiver);
                if (oldValue !== res) {
                    view.model.set({ [key]: value })
                }
                return res;
            }
        }
    )
    return proxy;
}


function track(target, key) {
    //target을 null로 명시적으로 바꿔준다.
    //현재 view내부의 context얻기?
    //현재 view내부의 fn얻기?
    // view내부에 target을 심어둔다.
    // behavior에 target을 심어둔다... 
    // view에도 심어둬야하는데 이건 antipattern아닐지... (전역으로 심어둬도 되는데 굳이...?)
    //view에 대한 context를 어떻게 얻지?
    //만약 view가 해제가 되어도 proxy가 해제가 안된다면? 어쩔수없지않나? 
    // weakmap으로 garbage collect 확인하기.
    // 현재 실행중인 effect여부를 판단. 만약 있다는건 watch내부에서 실행한것을 의미함.
    // watch가 실행중이라면 반드시 알아야할건 바로.. 현재 실행중인것에 대한 컨셉이 아닐까? => 1. watch가 실행중이라면 반드시 알것이다. 따라서 wrapping해도 된다? 안된다? 
    // watch가 실행중이라면... 반드시 use는 동작한다? (이부분 todof로 고칠것.)
    // TODO :  나는 view를 주입시키지 않은데 어떻게 해결해야할까? (performance issue)
    // TODO : Zombie View 체크 및 어떻게 해야하는지?
    // TODO : two -depth의 경우 어떻게 처리해야할지?
    // 

    const activeEffect = getCurrentActiveFn();
    if (!activeEffect) return;
    const view = getCurrentView();
    if (!view && !view.model) return;
    view.listenTo(view.model, `change:${key}`, activeEffect);
    // map tree 방식으로 관리하지 않음.
    // let depsMap = targetMap.get(target);
    // if (!depsMap) {
    //     targetMap.set(target, (depsMap = new Map()));
    // }
    // let dep = depsMap.get(key);
    // if (!dep) {
    //     depsMap.set(key, (dep = new Set()));
    // }
    // if (!dep.has(activeEffect)) {
    //     // dep.add(activeEffect);
    // }

}


// function trigger(target, key) {

//     //how to get trigger?? that's issue.. :(...

//     const depsMap = targetMap.get(target);
//     if (!depsMap) {
//         return;
//     }

//     const dep = depsMap.get(key);
//     if (dep) {
//         console.log(dep)
//         dep.forEach(effect => effect());
//     }
// }
