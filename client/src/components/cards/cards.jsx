import React from 'react'
import Card from '../card/card'
import './cards.css'

const cards = ({info}) => {
  return (
    <div className='cards-cont'>
        {
          info.map((food)=> <Card 
          key={food.id}
          image={food.image} 
          title={food.title} 
          diets={food.diets}
          id={food.id}
          summary={food.summary}
          healthScore={food.healthScore}
          analyzedInstructions={food.analyzedInstructions}/>)
            
        }

    </div>
  )
}

export default cards