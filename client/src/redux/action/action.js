import axios from "axios"
import { CLEAN_DETAIL, FILTER_BY_TYPEDIET, GET_BY_ID, GET_BY_NAME, GET_TYPE_DIETS, GET_USER, HANDLE_NUMBER, ORDER, ORDER_BY_PUNTUATION, ORDER_BY_SOURCE, PAGINATE } from "./action-type"

export function postFood(state){
    return async function(dispatch){
        try {
            console.log("action:", state)
            const response = await axios.post("http://localhost:3001/", state)
            alert("Se creo la receta correctamente.")
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}


export function getFood(state){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/")
            const list = response.data.map(({ Diets, ...props }) => ({ diets: Diets, ...props }))
            dispatch({
                type: GET_USER,
                payload: list
            })
        }catch (error) {
            console.log(error)
        }
    }
}


export function pag(dirreccion){
    return async function(dispatch){
        try {
            dispatch({
                type:PAGINATE,
                payload:dirreccion
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function order(dirreccion){
    return async function(dispatch){
        try {
            dispatch({
                type:ORDER,
                payload:dirreccion
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRecipesById(id){
    return async function(dispatch){
        try {
            const {data} = await axios.get(`http://localhost:3001/${id}`)
            dispatch( {
                type :GET_BY_ID,
                payload:data
            });
            console.log(data)
            console.log("action")
        } catch (error) {
           console.log(error.response.data.error)
        }
}
}

export function cleanDetail (payload){
    return {
        type: CLEAN_DETAIL,
        payload
    }
}

export function orderBySource(source){
    return async function(dispatch){
        try {
            dispatch({
                type: ORDER_BY_SOURCE,
                payload:source
            })  
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
}

export function handleNumber(num) {
    return {
        type: HANDLE_NUMBER,
        payload: num,
    };
}

export function getRecipesByName (title){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001?title=${title}`);
            return dispatch( {
                type : GET_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
   
}
}

export function getTypeDiets () {
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/diets/diets`);
        return dispatch( {
            type : GET_TYPE_DIETS ,
            payload: json.data,
        })
    }
}

export function orderByPuntuation (order){
    return {
        type : ORDER_BY_PUNTUATION,
        payload:order
    }
}

export function filterRecipesByTypeDiet (payload){
    return {
        type : FILTER_BY_TYPEDIET,
        payload
    }
}