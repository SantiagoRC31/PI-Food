import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import { getRecipesByName } from "../../redux/action/action";

import "./navbar.css"


const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const location = useLocation();


  const isDetailsRoute = location.pathname.startsWith('/details/');



  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() === '') {
      alert('Por favor, ingresa un nombre válido');
      // validacion para que el nombre no este en blanco o solo con espacios, muestra un mensaje de error
    } else {

      dispatch(getRecipesByName(search));
      setSearch("");
    }
  };

  const handleName = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div className='nav-cont'>
      <div className='nav-img-cont'>
        <Link to={"/"}><img src="https://tse3.mm.bing.net/th?id=OIP.vO-ovlBwasI3oxA7Bbw2uAHaHM&pid=Api&P=0&h=180" alt="Logo" /></Link>
      </div>
      <div className='nav-link-cont'>
        <Link to={"/home"} className="bot-nav"></Link>
        <Link to={"/create"} className="bot-nav1"></Link>
      </div>
      <div>
      {!isDetailsRoute && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={search} onChange={handleName}/>
          <input type="submit" value={"Buscar"} />
        </form>
         )}
      </div>
    </div>

  )
}

export default Navbar