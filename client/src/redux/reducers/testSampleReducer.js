const initialState = {
    age: 20
};

const testSampleReducer = (state = initialState, action) => {

    switch (action.type) {
        case "AGE_UP_ASYNC":
            return {
              ...state,
              age: state.age + action.value
            };

        case "AGE_DOWN_SYNC":
           return {
            ...state,
            age: state.age - action.value
          };

        default:
            return state;
    }
};

export default testSampleReducer;