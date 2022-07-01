import React from "react";
import './Header.scss'

const Header = (props) => {
    return(
        <header>
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt=""/>
          <div className="headerInfo">
            <h3>Sneakers store</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="headerRight">
            <li onClick={props.onClickCart} className="cart-info"><img className="cart-img" width={18} height={18} src="/img/cart.svg" alt=""/><span>50 $</span></li>
            <li className="favorite-info"><img width={18} height={18} src="/img/favorite.svg" alt=""/></li>
            <li className="user-info"><img width={18} height={18} src="/img/user.svg" alt=""/></li>
        </ul>
      </header>
    )
}
export default Header;