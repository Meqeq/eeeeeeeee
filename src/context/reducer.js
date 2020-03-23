export const CHANGE_NOT_EEE = "change not ee";
export const CHANGE_EE = "change ee";

export default (state, { type, payload }) => {
    switch(type) {
        case CHANGE_NOT_EEE:
            return {
                ...state,
                notee: payload
            }
        case CHANGE_EE:
            return {
                ...state,
                ee: payload
            }
        default: 
            return state;
    }
}