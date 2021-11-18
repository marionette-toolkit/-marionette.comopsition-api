import { watch } from './watch';
import { reactive } from './reactive';
import { onAttached, onBeforeAttached, onBeforeDestroyed, onBeforeDetched, onBeforeRendered, onDestroyed, onDetatched, onDomRefreshed, onRendered } from './lifecycles';
import CompositionBehavior from './CompositionBehavior'

export {
    watch,
    reactive,
    onAttached, onBeforeAttached, onBeforeDestroyed, onBeforeDetched, onBeforeRendered, onDestroyed, onDetatched, onDomRefreshed, onRendered,
    CompositionBehavior
}