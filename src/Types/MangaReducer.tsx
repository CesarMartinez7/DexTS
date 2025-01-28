export enum ConteoDeAcciones {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  REASIGNAR = "REASIGNAR",
}

export interface CountAction {
  type: ConteoDeAcciones;
  payload: number;
}

export interface CountState {
  count: number;
}

export function reducer(state: CountState, action: CountAction) {
  const { type, payload } = action;
  switch (type) {
    case ConteoDeAcciones.INCREMENT:
      return { count: state.count + 1 };
    case ConteoDeAcciones.DECREMENT:
      return { count: state.count - 1 };
    case ConteoDeAcciones.REASIGNAR:
      return { count: payload };
  }
}