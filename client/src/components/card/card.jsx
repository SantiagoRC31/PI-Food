import React from 'react'
import "./card.css"
import { Link } from 'react-router-dom'

const Card = ({image, title, diets, id}) => {
  return (
    <div key={id} className='card-cont'>
      <div>
        <h4>{title}</h4>
      </div>
      <Link to={`/details/${id}`}>
      <img className='card-img' src={image} alt=""></img>
      </Link>
      <div>
        <label>Diets:</label>
        {diets?.map((t, index) => (
        <h5 key={index}>{t.name}</h5>
        ))} 
      </div>
    </div>
  )
}

export default Card