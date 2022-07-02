import React from "react";
import Card from "../components/Card/Card";

const Home = ({items,searchValue,onAddToCart,onAddToFavorite,onChangeSearchInput}) => {
    return(
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
            <Card onFavorite={(obj) => onAddToFavorite(obj)} key={index} title={item.title} price={item.price} imageUrl={item.imageUrl} onPlus={(obj) => onAddToCart(obj)}/>
          ))
        }
        </div>
      </div>
    )
}

export default Home;