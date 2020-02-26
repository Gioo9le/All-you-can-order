import React from "react";

export default class MenuItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // orderedItems: 0,
        };
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    removeItem(event){
        var code;
        if(event.target.attributes.code !== undefined){
            code = event.target.attributes.code;
        }else{
            code = event.target.parentNode.attributes.code;
        }
        this.changeItem(code, -1);
    }

    addItem(event){
        var code;
        if(event.target.attributes.code !== undefined){
            code = event.target.attributes.code;
        }else{
            code = event.target.parentNode.attributes.code;
        }
        this.changeItem(code, +1);
    }

    changeItem(code, sign){
        console.log(code.value);
        this.props.order(code.value, this.props.listIdx, sign);

    }

    render(){
        return (
            <div className="MenuItem" code={this.props.code}>{this.props.name} <br/> {this.props.code} <br/> {this.props.count}Pz <br/>
                <button className="RemoveItem" onClick={this.removeItem}>-</button>
                <img src={this.props.img} className="itemLogo" alt={this.props.name}/>
                <button className="AddItem" onClick={this.addItem}>+</button>
                <div className="ItemCounter">{this.props.selected}</div>
            </div>
        )
    }
}