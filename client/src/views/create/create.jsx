import React, { useState, useEffect } from 'react';
import { getTypeDiets, postFood } from '../../redux/action/action';
import {useDispatch, useSelector} from "react-redux";

import "./create.css"


const Create = () => {

const dispatch = useDispatch();

let listDiets = useSelector((state) => state.diets);

const [state, setState] = useState({
  title:'',
  summary:'',
  healthScore:'',
  analyzedInstructions:'',
  diets:[],
  image:''
})

useEffect(() => {
  dispatch(getTypeDiets());
}, [dispatch]);


const [error, setError] = useState({
  title:"Campo requerido",
  healthScore:"No se permiten letras"
})



const handleChange = (event) =>{
  setState({
    ...state,
    [event.target.name]: event.target.value
  })
  validate({...state,
    [event.target.name]: event.target.value}, event.target.name )
}

const deshabilitar = () => {
  let disabled = true;
  for(let err in error){
    if(error[err]==="")disabled = false;
    else{
      disabled = true;
      break;
    }
  }
return disabled
}


const validate = (state, name) => {
  if (name === "title") {
    if (state.title !== "") {
      if (/^[A-Za-z\s]+$/.test(state.title)) {
        if (state.title.length >= 1 && state.title.length <= 30) {
          setError({ ...error, title: "" });
        } else {
          setError({ ...error, title: "Debe contener entre 1 y 30 caracteres" });
        }
      } else {
        setError({ ...error, title: "Debe contener solo letras y espacios" });
      }
    } else {
      setError({ ...error, title: "Campo requerido" });
    }
  }
  if (name === "healthScore") {
    const healthScoreValue = state.healthScore.trim();
  
    if (!/^\d+$/.test(healthScoreValue)) {
      setError({ ...error, healthScore: "El nivel de comida saludable debe ser un número" });
    } else if (parseInt(healthScoreValue) > 100) {
      setError({ ...error, healthScore: "El nivel de comida saludable no puede ser mayor que 100" });
    } else {
      setError({ ...error, healthScore: "" });
    }
  }
  if (name === "image") {
    if (state.image !== "") {
      // Expresión regular para validar URL
      const urlPattern = /^(http[s]?:\/\/){0,1}(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/;
      if (urlPattern.test(state.image)) {
        setError({ ...error, image: "" });
      } else {
        setError({ ...error, image: "Ingrese una URL válida" });
      }
    } else {
      setError({ ...error, image: "Campo requerido" });
    }
  }
}


const handleSubmit = (e) => {
  e.preventDefault()
  dispatch(postFood(state));
}

const handleSelect = (e) => {
  const varible = state.diets.concat(listDiets.find((element)=>{return element.id === +e.target.value}))
  console.log("data:", varible, e.target.value, listDiets)
  setState({
    ...state,
    diets: varible
  })
}

const limpiar = () =>{
  setState({
    ...state,
    diets:[]
  })
}

  return (
  <div className='form-cont'>
    <form onSubmit={handleSubmit}>
     <h1 className='title-create'>Create your recipe</h1>
     <hr></hr>
        <label>Name: </label>
        <input name="title" onChange={handleChange} type="text" placeholder="Ingresa nombre de la receta"/>
        <label className='form-error'>{error.title}</label>
        <hr></hr>
        <label>Summary: </label>
        <input name="summary" onChange={handleChange} type="text" placeholder="Ingresa resumen de la receta"/>
        <label className='form-error'>{error.summary}</label>
        <hr></hr>
        <label>Health Score: </label>
        <input name="healthScore" onChange={handleChange} type="text" placeholder="Ingresa el nivel de comida saludable"/>
        <label className='form-error'>{error.healthScore}</label>
        <hr></hr>
        <label>Analyzed Instructions: </label>
        <input name="analyzedInstructions" onChange={handleChange} type="text" placeholder="Ingresa el paso a paso de la receta"/>
        <label className='form-error'>{error.summary}</label>
        <hr></hr>
        <label>Image URL: </label>
        <input name="image" onChange={handleChange} type="text" placeholder="Ingresa la URL de la imagen"/>
        <label className='form-error'>{error.image}</label>
        <hr></hr>
        <select onChange={handleSelect}>
            {listDiets?.map((t) => (
              <option 
              key={t.id} 
              value={t.id}
              disabled={state.diets.some((diet) => diet.id === t.id)}>
              {t.name}
              </option>
            ))}
          </select>
          <a href='#' onClick={limpiar}>Limpiar</a>
          {state.diets?.map((a) =>(
            <label>{a.name}</label>
          ))}
        
        <hr></hr>
        <input disabled={deshabilitar()} className='form-button' type="submit" value={"Crear"}/>
        <hr></hr>
    </form>
  </div>
  )
}

export default Create 