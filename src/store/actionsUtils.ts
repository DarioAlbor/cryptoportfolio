export type Action<P> = {
  type: string;
  payload: P;
};

export type ActionCreator<U, P> =
  (U extends any[]
    ? (...args: U) => Action<P>
    : () => Action<P>)
  & { type: string };

export type ActionCreatorPayload<A extends ActionCreator<any, any>> =
  A extends (ActionCreator<any, infer P>) ? P : unknown;

export function createAction(
  type: string
): ActionCreator<[], void>;
export function createAction<U extends any[], P>(
  type: string,
  creator: (...args: U) => P
): ActionCreator<U, P>;

export function createAction<U extends any[], P>(
  type: string,
  creator?: (...args: U) => P
): ActionCreator<U, P> {
  const val =  (...actionArgs: U) => ({
        type,
        payload: creator?.(...actionArgs),
      });
  return Object.assign(val as ActionCreator<U, P>, { type });
}