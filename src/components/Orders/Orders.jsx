import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';

const Orders = () => {
    const {onAddToCart, onAddToFavorite} = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
       (async  () => {
       try {
        const {data} = await axios.get('https://62be58380bc9b12561556a4d.mockapi.io/orders'); 
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
       } catch (error) {
           alert('something went wrong :(')
       }
    })();
    },[])
    return(
            <div className="favorites"> 
            {(isLoading ? [...Array(10)] : orders.length > 0)   ?  <div>
                <div>
                    <h1 className="favorites_title">Мои Покупки</h1>
                </div>
            <div className="favorites_cards">
            {(isLoading ? [...Array(10)] : orders).map((item, index) => (
                <Card  {...item} key={index} loading={isLoading}/>
                ))
            }
                </div>
            </div> 
            : <div className="favorites_null">
            <div className="favorites_info">
                <img src="img/nofavorite.png" alt="" />
                <h3>У вас нет заказов</h3>
                <p>Вы нищеброд? Оформите хотя бы один заказ.</p>
                <Link to="/e-sneakers">
                    <button className="favorite_backbtn"><img src="img/arrowleft.svg" alt="" /> Вернуться назад</button>
                </Link>
            </div>
        </div>}
        </div>
    )
}
export default Orders;