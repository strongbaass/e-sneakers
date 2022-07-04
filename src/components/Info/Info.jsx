import React from 'react'

const Info = ({onCloseCart, title, imgUrl, description}) => {
    return( 
        <div className="cart_empty">
            <div className='cart_empty_info'>
                <img src={imgUrl} alt="" />
                <h2 className="cart_empty_title">{title}</h2>
                <p className="cart_empty_text">{description}</p>
                <button onClick={onCloseCart} className="cart_empty_backbtn"><img src="img/arrow.svg" alt="" /> Вернуться назад</button>
            </div>
        </div>
    )
}

export default Info;