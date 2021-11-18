function createViewContext() {
    let currentInstance = null;
    const checkConflict = (instance) => {
        if (currentInstance && currentInstance !== instance) {
            throw new Error("Context conflict");
        }
    };
    return {
        getCurrentView: () => currentInstance,
        callWith: (instance, cb, args) => {
            checkConflict(instance);
            currentInstance = instance;
            try {
                const res = cb(args);
                currentInstance = null;
                return res;
            } catch (err) {
                currentInstance = null;
                throw err;
            }
        }
    };
}

function createFnContext() {
    let createActiveFunction = null;
    const checkConflict = () => {
        if (createActiveFunction) {
            throw new Error("Context conflict");
        }
    };
    return {
        getCurrentActiveFn: () => createActiveFunction,
        setCurrentActiveFn: (fn) => {
            checkConflict();
            createActiveFunction = fn;
            try {
                fn();
                createActiveFunction = null;
            } catch (err) {
                createActiveFunction = null;
                throw err
            }
        },
    };
}

export const { getCurrentActiveFn, setCurrentActiveFn } = createFnContext()
export const { getCurrentView, callWith } = createViewContext()