import {AGE_UP, AGE_DOWN} from 'variables/testVariables';

// Action Generators

export const onAgeUp = () => ({ type: AGE_UP, value: 1 });

export const onAgeDown = () => ({ type: AGE_DOWN, value: 1 });