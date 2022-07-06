import React from "react";
import Card from "../components/Card/Card"; 

const Home = ({items,searchValue,onAddToCart,onAddToFavorite,onChangeSearchInput, cartItems, isLoading}) => {
  const filteredItems =  items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
  const renderItems = () => {
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card 
      loading={isLoading} 
      onFavorite={(obj) => onAddToFavorite(obj)} 
      key={index}
      {...item} 
      onPlus={(obj) => onAddToCart(obj)}/>
    ))
  }
    return(
        <div className="content">
        <div className="content_info">
          <h1>{searchValue ? `Search by: "${searchValue}"` : 'All sneakers'}</h1>
          <div className="search_menu">
            <img src="/img/search.svg" alt="Search"/>
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search...."/>
          </div>
        
        </div>
        <div className="sneakers"> 
        {renderItems()}
        </div>
      </div>
    )
}

export default Home;