import React, { useState, useContext } from "react";
import './Card.scss'
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

const Card = ({id, imageUrl, title,price, onPlus, onFavorite, favorited = false, loading = false,}) => {
  const [isFavorite, setIsFavorite] = useState(favorited);
  const {isItemAdded} = useContext(AppContext);
  const obj = {id, parentId: id, title, price, imageUrl}

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite(obj)
  }

  const onClickPlus = () =>{
    onPlus(obj)
  }
    return(
        <div className="card">
          {loading ? <ContentLoader 
      speed={2}
      width={155}
      height={265}
      viewBox="0 0 155 265"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
    <rect x="0" y="0" rx="10" ry="10" width="155" height="91" /> 
    <rect x="0" y="106" rx="3" ry="3" width="155" height="15" /> 
    <rect x="0" y="124" rx="3" ry="3" width="93" height="15" /> 
    <rect x="0" y="162" rx="8" ry="8" width="80" height="24" /> 
    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
  </ContentLoader> : <>
          <div className="card_favorite">
           {onFavorite && <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked"/>}
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
        <h5>{title}</h5>
        <div className="card-info">
          <div className="card-info-price">
            <span>Цена:</span>
            <b>{price}$</b>
          </div>
         {onPlus && <img onClick={onClickPlus} className="card-plus" src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt=""/>}
        </div> 
      </>}
      </div>
    )
}
export default Card;