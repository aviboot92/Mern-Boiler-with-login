// Action Generators

export const onAgeUp = () => dispatch => dispatch({ type: "AGE_UP", value: 1 });

export const onAgeDown = () => dispatch => dispatch({ type: "AGE_DOWN", value: 1 });