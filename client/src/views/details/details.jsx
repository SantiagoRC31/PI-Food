import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesById } from '../../redux/action/action';

import "./detail.css";


const Details = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      dispatch(getRecipesById(id))

    }
    return () => {

    };
  }, [id]);

  const detailState = useSelector((state) => state.details)
  if (!detailState || (Array.isArray(detailState) && detailState.length === 0)) {
    return (<div>cargando...</div>)
  }
  return (

    <div className='detail-cont'>
      <h1 className='title-detail'>DETAIL</h1>
      <div>
        <h3>Id: </h3>
        <label>{detailState[0].id}</label>
      </div>
      <div>
        <h3>Title: </h3>
        <label>{detailState[0].title}</label>
      </div>
      <img src={detailState[0].image} alt=""></img>
      <div>
        <h3>Summary: </h3>
        <label>{detailState[0].summary}</label>
      </div>
      <div>
        <h3>Health Score: </h3>
        <label>{detailState[0].healthScore}</label>
      </div>
      <div>
        <h3>Analyzed Instructions: </h3>
        {Array.isArray(detailState[0].analyzedInstructions) ? (
          detailState[0].analyzedInstructions?.map((s, nombre) => (
            s.steps?.map((step) => (
              <label> key={nombre}{step.step}</label>
            ))
          ))
        ) : (
          <label>{detailState[0].analyzedInstructions}</label>
        )
        }
      </div>
      <div>
        <h3>Diets: </h3>
        {detailState[0].diets?.map((t, index) => (
          <label key={index}>{t}</label>

        ))}
      </div>
    </div>
  );
};

export default Details 