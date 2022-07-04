import React, { useContext } from "react";
import Card from "../components/Card/Card";
import '../styles/Favorites.scss'
import {Link} from 'react-router-dom'
import { AppContext } from "../App";

const Favorites = ({ onAddToFavorite}) => {
    const {favorites} = useContext(AppContext)
    return(
        <div className="favorites">   
            {favorites.length  ? 
            <div>
                <div>
                    <h1 className="favorites_title">Мои закладки</h1>
                </div>
            <div className="favorites_cards">
            {
            favorites.map((item, index) => (
                <Card favorited={true} {...item} key={index} onFavorite={onAddToFavorite}/>
                ))
            }
                </div>
            </div>
            : 
            <div className="favorites_null">
                <div className="favorites_info">
                    <img src="/img/nofavorite.png" alt="" />
                    <h3>Закладок нет :(</h3>
                    <p>Вы ничего не добавляли в закладки</p>
                    <Link to="/">
                        <button className="favorite_backbtn"><img src="/img/arrowleft.svg" alt="" /> Вернуться назад</button>
                    </Link>
                </div>
            </div>}
        </div>
    )
}

export default Favorites;