import React, { useState } from "react";
import './Card.scss'

const Card = ({id, imageUrl, title,price, onPlus, onFavorite, favorited}) => {
  const [isAdded, setIsAdded] = useState(false); 
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite({id,title, price, imageUrl})
  }

  const onClickPlus = () =>{
    setIsAdded(!isAdded);
    onPlus({id,title, price, imageUrl})
  }
    return(
        <div className="card">
        <div className="card_favorite">
           <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked"/>
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
        <h5>{title}</h5>
        <div className="card-info">
          <div className="card-info-price">
            <span>Цена:</span>
            <b>{price}$</b>
          </div>
          <img onClick={onClickPlus} className="card-plus" src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt=""/>
        </div>
      </div>
    )
}
export default Card;