import React from "react";
import './index.scss'

const App = () => {
  return(
    <div className="wrapper">
      <header>
        <div className="headerLeft">
          <svg/>
          <div className="headerInfo">
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul>
            <li><svg/>50$</li>
            <li><svg/></li>
        </ul>
      </header>
    </div>
  )
}
export default App