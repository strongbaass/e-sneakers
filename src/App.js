import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import axios from 'axios'
import './index.scss'
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Favorites from "./pages/Favorites";


const App = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([])
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://62be58380bc9b12561556a4d.mockapi.io/items').then(res => {
      setItems(res.data)
    })
    axios.get('https://62be58380bc9b12561556a4d.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })
    axios.get('https://62be58380bc9b12561556a4d.mockapi.io/favorites').then(res => {
      setFavorites(res.data)
    })   
  }, []);
  
  const onAddToCart = (obj) => {
    if(cartItems.find((item) => Number(item.id) === Number(obj.id))){
      setCartItems((cartItems) => cartItems.filter((item) => Number(item.id) !== Number(obj.id)));
    }else{
      axios.post('https://62be58380bc9b12561556a4d.mockapi.io/cart', obj);
      setCartItems((cartItems) => [...cartItems, obj]);
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/cart/${id}`);
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
   try {
    if(favorites.find((favObj) => favObj.id === obj.id)){
      axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/favorites/${obj.id}`);
      setFavorites((favorites) => favorites.filter((item) => item.id !== obj.id));
    }else{
      const {data} = await axios.post('https://62be58380bc9b12561556a4d.mockapi.io/favorites', obj);
      setFavorites([...favorites, data]);
    }
   } catch (error) {
    alert('Something went wrong')
   }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return(
    <div className="wrapper">
     {cartOpened && <CartDrawer onRemove={onRemoveItem} items={cartItems} onCloseCart={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/> 
       <Routes>
            <Route path="/" element={<Home items={items} searchValue={searchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchInput={onChangeSearchInput}/>}/>
            <Route path="/favorites" element={<Favorites onAddToFavorite={onAddToFavorite} items={favorites}/>}/>
        </Routes>

    </div>
  )
}
export default App;