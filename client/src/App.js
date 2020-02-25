import React from 'react';
import './App.css';
import AppMainContent from "./AppMainContent";
import ServerIP from './index.js'


class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <>
                <AppHeader/>
                <div className="UpperSeparator"/>
                <AppMainContent/>
                <div className="BottomSeparator"/>
            </>
        )
    }

}

class AppHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    resetOrder(){
        fetch(ServerIP+"order/reset/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(res => console.log(res));
    }

    render(){
        return (
            <div className="AppHeader">
                TemakiOrder
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <Container/>
        )
    }
}

export default App;
