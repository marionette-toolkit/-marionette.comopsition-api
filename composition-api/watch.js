import { setCurrentActiveFn } from './contexts';

export function watch(fn) {
    setCurrentActiveFn(fn);
}