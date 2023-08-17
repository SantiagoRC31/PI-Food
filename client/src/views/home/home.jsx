import React, { useEffect,  useState } from 'react';
import Cards from '../../components/cards/cards';
import {useDispatch, useSelector} from "react-redux";
import { filterRecipesByTypeDiet, getFood, getTypeDiets, order, orderByPuntuation, orderBySource, pag } from '../../redux/action/action';

import "./home.css";

const Home = () => {
  
  const dispatch = useDispatch();

  const allFood = useSelector((state)=> state.allFood);
  const diets = useSelector((state) => state.diets);
  console.log("datos:", diets)
  const [state, setState] = useState({
    diets:[],
  })
  console.log(allFood);
  useEffect(() => {
    dispatch(getTypeDiets());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getFood())
    return () => {

    }
  },[])

  const paginate = (event) => {
    dispatch(pag(event.target.name))
  }

  const ordenamiento = (event) => {
    dispatch(order(event.target.name))
  }

  const handleFromApi = (event) => {
    dispatch(orderBySource(event.target.value))
  };

  const handlePuntuation = (e) => {
    dispatch(orderByPuntuation(e.target.value));
  };

  const handleFilterTypeDiet = (e) => {
    setState({
      ...state,
      diets:[...state.diets, e.target.value]
    });
    dispatch(filterRecipesByTypeDiet (e.target.value));
  };

 
  return (
    <div className='home-cont'>
        <h1 className='title-home'>FOOD</h1>
        <div>
          <button name="prev" onClick={paginate}>Prev</button>
          <button name="next" onClick={paginate}>Next</button>
        </div>
        <div>
          <button name="az" onClick={ordenamiento}>A - Z</button>
          <button name="za" onClick={ordenamiento}>Z - A</button>  
        </div>
        <div>
            <button value="All" onClick={handleFromApi}>ALL RECIPES</button>
            <button value="API" onClick={handleFromApi}>FROM API</button>
            <button value="BDD" onClick={handleFromApi}>FROM DATABASE</button>
        </div>
        <div>
            <select onChange={handlePuntuation}>
              <option value="mayormenor">Mayor a menor health score</option>
              <option value="menormayor">Menor a mayor health score</option>
            </select>
        </div>
        <div>
            <select onChange={handleFilterTypeDiet} >
              <option value="All">Todas las recetas</option>
              {diets.map((diet) => (
                <option key={diet.name} value={diet.name}>
                  {diet.name}
                </option>
              ))}
            </select>
          </div>


        <div>
            <Cards info={allFood}/>
        </div>
    </div>
  )
}

export default Home;