import React, {useState} from "react";
import './CardDrawer.scss';
import Info from "../Info/Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

const CartDrawer = ({onCloseCart, onRemove,items = [], opened}) => {
  const {totalPrice, cartItems, setCartItems} = useCart()
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const onClickOrder = async () => {
    try {
      const {data} = await axios.post('https://62be58380bc9b12561556a4d.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62be58380bc9b12561556a4d.mockapi.io/cart/' + item.id)
      }
    } catch (error) {
      alert('Something went wrong :(')
    }
 
  }
  function taxTotal  () {
    const taxPrice = totalPrice / 100 * 5;
    const tax = [...taxPrice.toString()].map(String);
    if(tax.length > 5){
    tax.length = 5
    }
    return tax
  }
    return(
        <div className={`overlay ${opened ? "overlay_visible" : ''}`}> 
        <div className="drawer">
          <div className="cart">
            <h2 className="cart-title">Cart<img onClick={onCloseCart} src="/img/btn-remove.svg" alt="Remove"/></h2>

            {items.length > 0 ?
            <div>
              <div className="items">
            {items.map((obj) => (
                <div key={obj.id} className="cartItem">
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
              <span>Amount:</span>
              <div></div>
              <b>{totalPrice} $</b>
            </li>
            <li className="cart-tax">
              <span>Tax 5%:</span>
              <div></div>
              <b>{taxTotal()} $</b>
            </li>
          </ul>
          <button className="cart-checkout-btn" onClick={onClickOrder}>Make an order<img src="/img/arrow.svg" alt="Arrow"/></button>
        </div>
            </div>
            : <Info onCloseCart={onCloseCart} title={isOrderComplete ? "Your order is processed!" : "Cart is empty"}imgUrl={isOrderComplete ? "/img/complete-order.jpg" :"/img/box.png" } description={isOrderComplete ? `Your order #${orderId} order will soon be delivered by courier` : "Add at least one pair of sneakers to make an order"}/>
                }
          </div>
        </div>
      </div>
    )
}
export default CartDrawer;