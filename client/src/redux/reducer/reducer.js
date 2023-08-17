import { FILTER_BY_TYPEDIET, GET_BY_ID, GET_BY_NAME, GET_TYPE_DIETS, GET_USER, HANDLE_NUMBER, ORDER, ORDER_BY_PUNTUATION, ORDER_BY_SOURCE, PAGINATE } from "../action/action-type";

let inicialState = {
    allFood: [],
    allFoodCopy: [],
    allFoodFilter: [],
    details: [],
    diets: [],
    numPage: 1,
    currentPage: 0,
}


function rootReducer(state = inicialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                allFood: [...action.payload].splice(0, 9),
                allFoodCopy: action.payload,
                allFoodFilter: action.payload
            }
            break;

        case PAGINATE:
            const next_page = state.currentPage + 1;
            const prev_page = state.currentPage - 1;
            const firstIndex = action.payload === "next" ? next_page * 9 : prev_page * 9;
            if (action.payload === "next" && firstIndex >= state.allFoodFilter.length) { return [...state] }
            else if (action.payload === "prev" && prev_page < 0) { return [...state] }

            return {
                ...state,
                allFood: [...state.allFoodFilter].splice(firstIndex, 9),
                currentPage: action.payload === "next" ? next_page : prev_page

            }

        case ORDER:
            if (action.payload === "az") {
                const allFoodOrder = [...state.allFoodCopy].sort((prev, next) => {
                    if (prev.title > next.title) return 1
                    if (prev.title < next.title) return -1
                    return 0
                })
                return {
                    ...state,
                    allFood: [...allFoodOrder].slice(0, 9),
                    allFoodFilter: allFoodOrder,
                    currentPage: 0
                }
            } else if (action.payload === "za") {
                const allFoodOrder = [...state.allFoodCopy].sort((prev, next) => {
                    if (prev.title > next.title) return -1
                    if (prev.title < next.title) return 1
                    return 0
                })
                return {
                    ...state,
                    allFood: [...allFoodOrder].slice(0, 9),
                    allFoodFilter: allFoodOrder,
                    currentPage: 0
                }
            }


        case GET_BY_ID:
            return {
                ...state,
                details: action.payload,
            };


        case ORDER_BY_SOURCE:

            let fromApi = state.allFoodCopy.filter((allFoods) => !isNaN(+allFoods.id));
            let fromBDD = state.allFoodCopy.filter((allFoods) => isNaN(+allFoods.id));
            let all = state.allFoodCopy
            if (action.payload === "API") {
                return {
                    ...state,
                    allFood: fromApi.slice(0, 9),
                    allFoodFilter: fromApi
                };
            } else if (action.payload === "BDD") {
                return {
                    ...state,
                    allFood: fromBDD.slice(0, 9),
                    allFoodFilter: fromBDD
                };
            } else if (action.payload === "All") {
                return {
                    ...state,
                    allFood: all.slice(0, 9),
                    allFoodFilter: all
                };
            }

        case HANDLE_NUMBER:
            return {
                ...state,
                numPage: action.payload,
                currentPage: 0
            };


        case GET_BY_NAME:
            return {
                ...state,
                allFood: action.payload,
            };


        case GET_TYPE_DIETS:
            return {
                ...state,
                diets: action.payload,
            };

        case ORDER_BY_PUNTUATION:
            let orderpunt =
                action.payload === "menormayor"
                    ? state.allFoodCopy.sort(function (a, b) {
                        if (a.healthScore > b.healthScore) {
                            return 1;
                        }
                        if (b.healthScore > a.healthScore) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.allFoodCopy.sort(function (a, b) {
                        if (a.healthScore > b.healthScore) {
                            return -1;
                        }
                        if (b.healthScore > a.healthScore) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                allFood: orderpunt.slice(0, 9),
                allFoodFilter: orderpunt
            };

        case FILTER_BY_TYPEDIET:
            const allRec = state.allFoodCopy;

            const typeDietFilter = action.payload === "All"
                ? allRec
                : allRec.filter((recipe) =>
                    recipe.diets.some((diet) => diet.name === action.payload)
                );
            return {
                ...state,
                allFood: typeDietFilter.slice(0, 9),
                allFoodFilter: typeDietFilter
            };

        default:
            return state
            break;
    }

}

export default rootReducer;