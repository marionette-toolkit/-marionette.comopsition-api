
import { getCurrentView } from './contexts'

export function getCurrentInstance() {
    return getCurrentView();
}

function listenEvent(keyword, callback) {
    const ctx = getCurrentInstance();
    ctx.listenTo(ctx, keyword, callback);
}
function onBeforeRendered(callback) {
    listenEvent('before:render', callback)
}
function onRendered(callback) {
    listenEvent('render', callback)
}
function onAttached(callback) {
    listenEvent('attach', callback)
}
function onBeforeAttached(callback) {
    listenEvent('before:attach', callback)
}
function onDomRefreshed(callback) {
    listenEvent('dom:refresh', callback)
}
function onBeforeDestroyed(callback) {
    listenEvent('before:destroy', callback)
}
function onBeforeDetched(callback) {
    listenEvent('before:detach', callback)
}
function onDetatched(callback) {
    listenEvent('detach', callback)
}
function onDestroyed(callback) {
    listenEvent('destroy', callback)
}

export { onBeforeAttached, onBeforeRendered, onRendered, onAttached, onDomRefreshed, onBeforeDestroyed, onBeforeDetched, onDetatched, onDestroyed }

