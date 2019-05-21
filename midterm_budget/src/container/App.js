import React, { Component } from "react";
import Item from '../component/Item'
import Button from '../component/button';
import axios from "axios";
import '../styles.css';

class App extends Component {
  state={
    items:[],
    inputName:"",
    inputPrice:0,
  }
  componentDidMount() {
    this.getItemFromDb();
  }
  getItemFromDb () {
    fetch("http://localhost:3000/backend/getItem")
      .then(item => item.json())
      .then(res => this.setState({ items: res.item }));
    };
  insertItemToDB = () => {
    const{inputName,inputPrice}=this.state;
    axios.post("http://localhost:3000/backend/insertItem", {
      projectName:inputName ,
      price:inputPrice
    });
  };
  deleteItemFromDB = ()=> {
    const{inputName,inputPrice}=this.state;
    axios.delete("http://localhost:3000/backend/deleteItem", {
      Item: {
        projectName:inputName ,
        price:inputPrice
      }
    });
  };
render(){
  return(
    <div id = "root" className = "todo-app__root">
    <header className = "todo-app_header"><h1 class = "todo-app__title">Products</h1></header>
      <section class="todo-app__main">
        <input id="todo-app__input" class = "todo-app__input" placeholder = "productName" onChange={e => this.setState({ input1: e.target.value })} ></input>
        <input id="todo-app__input" class = "todo-app__input" placeholder = "price"onChange={e => this.setState({ input1: e.target.value })} ></input>
      </section>
      <div className = "todo-app__list">
        {this.state.items.map((item) => 
          <Item projectName={item.projectName} price={item.price}></Item>
        )}
      </div>
      <footer class = "todo-app__footer" id = "todo-footer">
        <ul class = "todo-app__view-buttons">
          <li><Button btnName = "Insert" onClick = {this.insertItemToDB}></Button></li>
          <li><Button btnName = "Delete" onClick = {this.deleteItemFromDB}></Button></li>
        </ul>
      </footer>
  </div>
  )
};
}



  
  
export default App;
