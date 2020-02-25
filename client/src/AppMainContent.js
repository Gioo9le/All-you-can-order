import React from "react";
import MenuItem from './MenuItem'
import OrderBar from './OrderBar'
import socketIOClient from 'socket.io-client'
import ServerIP from './index.js'

var socket;
export default class AppMainContent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            mode: "login",
            restaurant: "",
            table: 0,
            user: "",
            items: [],
            orders: new Array(100),
            completeOrders: new Array(100),
            orderByUser: new Array(100),
            nConnectedUser: 0,

        };
        socket = socketIOClient(ServerIP);
        this.state.orders.fill(0);
        this.sendOrder = this.sendOrder.bind(this);
        this.login = this.login.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setRestaurant = this.setRestaurant.bind(this);
        this.setTable = this.setTable.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
    }

    componentDidMount() {
        fetch(ServerIP+"menu")
            .then(res => res.json())
            .then(res => this.setState({ items: res }));
        //console.log(JSON.stringify(this.state.items));
        socket.emit('user connection');
        socket.on('user connection', (usr) => {
            this.setState({
                nConnectedUser: usr,
            });
            console.log(usr);
        })

    }

    updateOrder(itemCode, sign){
        let ordersUpdate = this.state.orders;
        if(ordersUpdate[itemCode] + sign>=0)
            ordersUpdate[itemCode] = ordersUpdate[itemCode] + sign;
        this.setState({
            orders: ordersUpdate,
        });
    }

    sendOrder(){
        let order = {
            user: this.state.user,
            table: this.state.table,
            items: this.state.orders,
        };

        fetch(ServerIP+"order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(res => res.json()).then(res => {
            this.setState({
                completeOrders: res.complete,
                orderByUser: res.byUser,
            });
            console.log(res);
        });

    }

    setUserName(e){
        this.setState({
            user: e.target.value,
        })
    }

    setTable(e){
        this.setState({
            table: e.target.value,
        })
    }

    setRestaurant(e){
        this.setState({
            restaurant: e.target.value,
        })
    }

    tryLogin(e){
        if(e.keyCode === 13){
            this.login()
        }
    }

    login(){
        //TODO: Fetch server and retrieve previous order of the user if any are present SOLVED
        fetch(ServerIP+"order/userMenu/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:this.state.user,
                table:this.state.table,
            }),
        })
            .then(res => res.json())
            .then(res => this.setState({ orders: res }));
        this.setState({
            mode: "menu"
        })
    }

    forceUpdate(callBack) {
    }

    render(){

        let myOrder = this.state.orders.map((item, idx) => {
            return [item, idx];
        }).filter((item) => {
            return item[0]>0;
        });

        let completeOrder = this.state.completeOrders.map((item, idx) => {
            return [item, idx];
        }).filter((item) => {
            return item[0]>0;
        });
        if(this.state.mode === "menu"){
            return (
                <div className="AppMainContent">
                    <button id="Send" onClick={this.sendOrder}>OK</button>
                    {/*TODO: Add sections of the menu*/}
                    {this.state.items.map((item, idx) => {
                        return <MenuItem name={item.name} count={item.count} img={item.img} code={item.code} order={this.updateOrder.bind(this)} selected={this.state.orders[idx+1]}/>
                    })}
                    <OrderBar selectedItems={myOrder} menu={this.state.items} complete={completeOrder} byUser={this.state.orderByUser}/>
                    {/*<MyOrder selectedItems={myOrder} menu={this.state.items}/>*/}
                </div>
            )
        }else if(this.state.mode === "login"){
            return (
                <div className="Login">
                    <input className="LoginInput" id="restaurant" type="text" placeholder={"Ristorante"} onChange={this.setRestaurant} onKeyDown={this.tryLogin}/>
                    <input className="LoginInput" id="table" type="text" placeholder={"Tavolo"} onChange={this.setTable} onKeyDown={this.tryLogin}/>
                    <input className="LoginInput" id="name" type="text" placeholder={"Nome"} onChange={this.setUserName} onKeyDown={this.tryLogin}/>
                    <button id="loginButton" onClick={this.login}>OK</button>
                    <div id={"CurrentlyConnected"}>Utenti connessi: {this.state.nConnectedUser}</div>
                </div>

            )
        }
    }
}