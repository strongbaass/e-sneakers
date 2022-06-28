import React from "react";
import './index.scss'

const App = () => {
  return(
    <div className="wrapper">
      <header>
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt=""/>
          <div className="headerInfo">
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="headerRight">
            <li className="cart-info"><img className="cart-img" width={18} height={18} src="/img/cart.svg" alt=""/><span>50$</span></li>
            <li className="favorite-info"><img width={18} height={18} src="/img/favorite.svg" alt=""/></li>
            <li className="user-info"><img width={18} height={18} src="/img/user.svg" alt=""/></li>
        </ul>
      </header>
      <div className="content">
        <h1>Все кроссовки</h1>
  
        <div className="sneakers"> 
        <div className="card">
          <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneakers"/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="card-info">
            <div className="card-info-price">
              <span>Цена:</span>
              <b>129.90$</b>
            </div>
            <button className="card-add-btn"><img width={11} height={11} src="/img/plus.svg" alt=""/></button>
          </div>
        </div>
        <div className="card">
          <img width={133} height={112} src="/img/sneakers/2.jpg" alt="Sneakers"/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="card-info">
            <div className="card-info-price">
              <span>Цена:</span>
              <b>129.90$</b>
            </div>
            <button className="card-add-btn"><img width={11} height={11} src="/img/plus.svg" alt=""/></button>
          </div>
        </div>
        <div className="card">
          <img width={133} height={112} src="/img/sneakers/3.jpg" alt="Sneakers"/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="card-info">
            <div className="card-info-price">
              <span>Цена:</span>
              <b>129.90$</b>
            </div>
            <button className="card-add-btn"><img width={11} height={11} src="/img/plus.svg" alt=""/></button>
          </div>
        </div>
        <div className="card">
          <img width={133} height={112} src="/img/sneakers/4.jpg" alt="Sneakers"/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="card-info">
            <div className="card-info-price">
              <span>Цена:</span>
              <b>129.90$</b>
            </div>
            <button className="card-add-btn"><img width={11} height={11} src="/img/plus.svg" alt=""/></button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
export default App