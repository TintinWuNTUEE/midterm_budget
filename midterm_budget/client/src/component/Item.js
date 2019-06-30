import React from 'react';
import "../styles.css"
export default (productName,price)=>{
    return(
        <div className = "todo-app__item">
            <h1 className = "todo-app__item-detail">{productName}</h1>
            <p className="todo-app__item-detail">{price}</p>
        </div>
    )
}