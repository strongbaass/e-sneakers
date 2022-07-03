import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import axios from 'axios'
import './index.scss'
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Favorites from "./pages/Favorites";


export const AppContext = React.createContext({});

const App = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([])
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData(){
      const cartResponse = await axios.get('https://62be58380bc9b12561556a4d.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://62be58380bc9b12561556a4d.mockapi.io/favorites'); 
      const itemsResponse = await axios.get('https://62be58380bc9b12561556a4d.mockapi.io/items'); 

      setIsLoading(false)
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);
  
  const onAddToCart = (obj) => {
    if(cartItems.find((item) => Number(item.id) === Number(obj.id))){
      axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/cart/${obj.id}`);
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
    if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
      axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/favorites/${obj.id}`);
      setFavorites((favorites) => favorites.filter((item) => Number(item.id) !== Number(obj.id)));
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return(
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, setCartItems}}>

    <div className="wrapper">
     {cartOpened && <CartDrawer onRemove={onRemoveItem} items={cartItems} onCloseCart={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/> 
       <Routes>
            <Route path="/" element={<Home isLoading={isLoading} cartItems={cartItems} items={items} searchValue={searchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchInput={onChangeSearchInput}/>}/>
            <Route path="/favorites" element={<Favorites onAddToFavorite={onAddToFavorite}/>}/>
        </Routes>
    </div>
    </AppContext.Provider>
  )
}
export default App;