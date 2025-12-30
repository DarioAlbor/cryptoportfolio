import { Action } from "./actionsUtils";

const createReducer = <S>(
    initial: S,
    actions: Record<string, (state: S, payload?: any) => S>
) => {
    const handlers: Record<string, (state: S, payload?: any) => S> = {};
    Object.entries(actions).forEach(([key, handler]) => {
        handlers[key] = handler;
    });
    return (state = initial, action: Action<unknown>): S => {
        const handler = handlers[action.type];
        if (handler !== undefined) {
            return handler(state, action.payload);
        }
        return state;
    };
};

export default createReducer;