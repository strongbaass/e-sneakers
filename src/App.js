import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import axios from 'axios'
import './index.scss'
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Favorites from "./pages/Favorites";
import Orders from "./components/Orders/Orders";


export const AppContext = React.createContext({});

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([])
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData(){
     try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
      axios.get('https://62be58380bc9b12561556a4d.mockapi.io/cart'),
      axios.get('https://62be58380bc9b12561556a4d.mockapi.io/favorites'), 
      axios.get('https://62be58380bc9b12561556a4d.mockapi.io/items')
    ]);

      setIsLoading(false)
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
     } catch (error) {
       alert('Something went wrong :(');
     }
    }
    fetchData();
  }, []);
  
  const onAddToCart = async (obj) => {
   try {
     const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
    if(findItem){
      setCartItems((cartItems) => cartItems.filter((item) => Number(item.parentId) !== Number(obj.id)));
      await axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/cart/${findItem.id}`);
    }else{
      setCartItems((cartItems) => [...cartItems, obj]);
      const { data } = await axios.post('https://62be58380bc9b12561556a4d.mockapi.io/cart', obj);
      setCartItems((cartItems) => cartItems.map(item => {
        if(item.parentId === data.parentId){
          return{
            ...item,
            id: data.id
          }
        }
        return item;
      }))
    }
   } catch (error) {
     alert('Something went wrong :(')
   }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/cart/${id}`);
      setCartItems((cartItems) => cartItems.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Something went wrong :(')
      console.log('inCart')
    }
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }
  const IsItemFavorited = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  }

  return(
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, setCartItems, onAddToCart, IsItemFavorited }}>

    <div className="wrapper">
        <CartDrawer onRemove={onRemoveItem} items={cartItems} onCloseCart={() => setCartOpened(false)} opened={cartOpened}/>
      <Header onClickCart={() => setCartOpened(true)}/> 
       <Routes>
            <Route path="/" element={<Home isLoading={isLoading} cartItems={cartItems} items={items} searchValue={searchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchInput={onChangeSearchInput}/>}/>
            <Route path="/favorites" element={<Favorites onAddToFavorite={onAddToFavorite}/>}/>
            <Route path="/orders" element={<Orders/>}/>
        </Routes>
    </div>
    </AppContext.Provider>
  )
}
export default App;