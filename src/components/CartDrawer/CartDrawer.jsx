import React from "react";
import './CardDrawer.scss';

const CartDrawer = ({onCloseCart, onRemove,items = []}) => {
    return(
        <div className="overlay"> 
        <div className="drawer">
          <div className="cart">
            <h2 className="cart-title">Корзина <img onClick={onCloseCart} src="/img/btn-remove.svg" alt="Remove"/></h2>

            {items.length > 0 ?
            <div>
              <div className="items">
            {items.map((obj) => (
                <div className="cartItem">
                  <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cart_sneakers" ></div>
                  <div className="cart_sneakers_info">
                  <p className="cart_sneakers_name">{obj.title}</p>
                  <b className="cart_sneakers_price">{obj.price} $</b>
              </div>
                <img className="cart_removebtn" src="/img/btn-remove.svg" onClick={() => onRemove(obj.id)}  alt="Remove"/>
              </div>
            ))}
          </div>
          <div className="cart-total-block">
          <ul>
            <li className="cart-total">
              <span>Итого:</span>
              <div></div>
              <b>129.90$</b>
            </li>
            <li className="cart-tax">
              <span>Налог 5%:</span>
              <div></div>
              <b>7$</b>
            </li>
          </ul>
          <button className="cart-checkout-btn">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
        </div>
            </div>
            : <div className="cart_empty">
                <img width={120} height={120} src="/img/box.png" alt="" />
                  <h2 className="cart_empty_title">Корзина пустая</h2>
                  <p className="cart_empty_text">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                  <button onClick={onCloseCart} className="cart_empty_backbtn"><img src="/img/arrow.svg" alt="" /> Вернуться назад</button>
                </div>
                }
          </div>
        </div>
      </div>
    )
}
export default CartDrawer;