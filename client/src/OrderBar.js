import React from "react";

export default class OrderBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myMode : "Closed",
            completeMode: "Closed",
        }
        this.toggleCompleteOrder = this.toggleCompleteOrder.bind(this);
        this.toggleMyOrder = this.toggleMyOrder.bind(this);
    }

    toggleMyOrder(){
        if(this.state.completeMode === "Opened"){
            this.setState({
                completeMode: "Closed"
            })
        }
        if(this.state.myMode === "Opened"){
            this.setState({
                myMode: "Closed"
            })
        }else if(this.state.myMode === "Closed"){
            this.setState({
                myMode: "Opened"
            })
        }
    }

    toggleCompleteOrder(){
        if(this.state.myMode === "Opened"){
            this.setState({
                myMode: "Closed"
            })
        }
        if(this.state.completeMode === "Opened"){
            this.setState({
                completeMode: "Closed"
            })
        }else if(this.state.completeMode === "Closed"){
            this.setState({
                completeMode: "Opened"
            })
        }

    }

    render() {
        return (
            <div className="OrderBar">
                <MyOrder mode={this.state.myMode} toggle={this.toggleMyOrder.bind(this)} selectItems={this.props.selectedItems} menu={this.props.menu}/>
                <CompleteOrder mode={this.state.completeMode} toggle={this.toggleCompleteOrder.bind(this)} selectItems={this.props.complete} menu={this.props.menu}/>
            </div>
        );
    }
}

class MyOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className={"Order" + this.props.mode} id={"MyOrder" + this.props.mode}>
                <div className="OrderTitle">
                    Il tuo ordine
                </div>
                <ul className="OrderList">
                    {this.props.selectItems.map((item) => {
                        return  <li>{item[1]}  x{item[0]} - {this.props.menu[item[1]-1].name}</li>
                    })}
                </ul>
                <button className="OpenMenu" onClick={this.props.toggle}/>
            </div>
        )
    }
}

class CompleteOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <div className={"Order" + this.props.mode} id={"CompleteOrder"+this.props.mode}>
                <div className="OrderTitle">
                    Ordine Tavolo
                </div>
                <ul className="OrderList">
                    {this.props.selectItems.map((item) => {
                        return  <li>{item[1]}  x{item[0]} - {this.props.menu[item[1]-1].name}</li>
                    })}
                </ul>
                <button className="OpenMenu" onClick={this.props.toggle}/>
            </div>
        );
    }
}