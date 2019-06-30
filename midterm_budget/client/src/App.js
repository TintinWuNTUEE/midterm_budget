import React, { Component } from "react";
import Item from './component/Item'
import Button from './component/button';
import axios from "axios";
import './styles.css';

class App extends Component {
  state={
    items:[],
    transItem:[],
    inputName:"",
    inputPrice:0,
  }
  componentDidMount() {
    this.getItemFromDb();
    this.itemTrans();
  }
  getItemFromDb () {
    fetch("http://localhost:5000/backend/getItem")
      .then(item => item.json())
      .then(res => this.setState({ items: res.item }));
    };
  insertItemToDB = () => {
    alert("insert start"+ this.state.inputName)
    const{inputName,inputPrice}=this.state;
    axios.post("http://localhost:5000/backend/insertItem", {
      productName:inputName ,
      price:inputPrice
    });
    alert("insert done")
  };
  deleteItemFromDB = ()=> {
    alert("delete start")
    const{inputName,inputPrice}=this.state;
    axios.delete("http://localhost:5000/backend/deleteItem", {
      Item: {
        projectName:inputName ,
        price:inputPrice
      }
    });
    alert("delete done")
  };
  itemTrans=()=>{
    if(this.state.items.length!==0)
    {
      this.setState({transItem:this.state.items.map((item) =>
      <Item projectName={item.projectName} price={item.price}></Item>)})
    }
  }
render(){
  return(
    <div id = "root" className = "todo-app__root">
    <header className = "todo-app_header"><h1 className = "todo-app__title">Products</h1></header>
      <section className="todo-app__main">
        <input id="todo-app__input" className = "todo-app__input" placeholder = "productName" onChange={e => this.setState({ inputName: e.target.value })} ></input>
        <input id="todo-app__input" className = "todo-app__input" placeholder = "price"onChange={e => this.setState({ inputPrice: e.target.value })} ></input>
      </section>
      <div className = "todo-app__list">
        {this.transItem}
      </div>
      <footer className = "todo-app__footer" id = "todo-footer">
        <ul className = "todo-app__view-buttons">
          <li><Button btnName = "Insert" onClick = {this.insertItemToDB}></Button></li>
          <li><Button btnName = "Delete" onClick = {this.deleteItemFromDB}></Button></li>
        </ul>
      </footer>
  </div>
  )
};
}
export default App;



