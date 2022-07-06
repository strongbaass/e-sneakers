import React from "react";
import { Link } from "react-router-dom";
import './Header.scss'
import { useCart } from "../../hooks/useCart";

const Header = (props) => {
  const {totalPrice} = useCart()

    return(
        <header>
           <Link to="/">
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt=""/>
          <div className="headerInfo">
            <h3>Sneakers store</h3>
            <p>Best sneakers store</p>
          </div>
        </div>
        </Link>
        <ul className="headerRight">
            <li onClick={props.onClickCart} className="cart-info"><img className="cart-img" width={18} height={18} src="/img/cart.svg" alt=""/><span>{totalPrice} $</span></li>
              <li className="favorite-info"><Link to="/favorites"><img className="favorite-img" width={18} height={18} src="/img/favorite.svg" alt=""/></Link></li>
            <li className="user-info"><Link to="/orders"><img className="user-img" width={18} height={18} src="/img/user.svg" alt=""/></Link></li>
        </ul>
      </header>
    )
}
export default Header;