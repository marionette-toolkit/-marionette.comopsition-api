# Marionette-Comopsition API

마리오네트에서 Vue 3의 Composition API를 활용할 수 있도록 만든 Marionette Behavior.

# CompositionBehavior 제공 메소드

## setup()
- `setup`은 `Marionette.View`가 `intialize` 되는 시점에 불립니다.
- 이 함수 안에서는 제공되는 composition api를 사용할 수 있습니다.
- 여기서 return 되는 값들은 view 인스턴스에 등록되어서 객체 내에서 접근 가능합니다.

## bind() 
- `bind`은 `Marionette.View`가 `render` 후에 불립니다. (onRender 시점입니다)
- 이 함수 안에서는 제공되는 composition api를 사용할 수 있습니다.
- 따라서 상태값과 `View.ui` 대한 전용 위치로 사용됩니다.

# Composition API 제공 메소드.
## reactive
- Reactive한 object를 만들 수 있습니다.
- ES6 Proxy 기반입니다.

## watch
- watch 함수 블럭에 사용되고 있는 변수가 변경되면 함수가 재 호출됩니다.
```
const ref = reactive({a : 5, b : 6})
watch(() => {
    console.log(ref.a + ref.b); 
})
ref.a++;
```
```
console:
11 // 최초 watch
12 // ref값 변경 후.
```

## lifecycles

마리오네트 라이프사이클과 같습니다.

- onBeforeAttached
- onBeforeRendered
- onRendered
- onAttached
- onDomRefreshed
- onBeforeDestroyed
- onBeforeDetched
- onDetatched
- onDestroyed 

# Usage
응집도/재활용/선언적인 코드를 작성할 수 있습니다.

## Before
```
...
logic() {
    ...
},
initialize() {
    window.addEventListener('scroll', this.logic, { passive: true })
},
onDestory() {
    window.removeEventListener('scroll', this.logic);
}

```

## After
```
function useScroll(listener) {

    function logic() {
        listener(window.pageYOffset);
    }

    onAttached(() => {
        window.addEventListener('scroll', logic, { passive: true });
    })

    onDestroyed(() => {
        window.removeEventListener('scroll', logic);
    })
}
```
```
...
setup() {
    useScroll((scrollY) => { 
        ...
    })
}
...
```
