import React, {useEffect, useState} from "react";
import axios from 'axios'
import './index.scss'
import Card from './components/Card/Card.jsx'
import Header from "./components/Header/Header";
import CartDrawer from "./components/CartDrawer/CartDrawer";


const App = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://62be58380bc9b12561556a4d.mockapi.io/items').then(res => {
      setItems(res.data)
    })
    axios.get('https://62be58380bc9b12561556a4d.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })  
  }, []);
  
  const onAddToCart = (obj) => {
    axios.post('https://62be58380bc9b12561556a4d.mockapi.io/cart', obj);
      setCartItems([...cartItems, obj]);
  }

  const onRemoveItem = (id) => {
    console.log(id)
    axios.delete(`https://62be58380bc9b12561556a4d.mockapi.io/cart/${id}`);
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return(
    <div className="wrapper">
     {cartOpened && <CartDrawer onRemove={onRemoveItem} items={cartItems} onCloseCart={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <div className="content">
        <div className="content_info">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кросовки'}</h1>
          <div className="search_menu">
            <img src="/img/search.svg" alt="Search"/>
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск...."/>
          </div>
        </div>
  
        <div className="sneakers"> 
        {
          items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card key={index} title={item.title} price={item.price} imageUrl={item.imageUrl} onPlus={(obj) => onAddToCart(obj)}/>
          ))
        }
        </div>
      </div>
    </div>
  )
}
export default App