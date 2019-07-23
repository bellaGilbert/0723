import React from "react"
import Login from "./pages/login/login"
import Admit from "./pages/admit/admit"
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom"
import './api'
export default class App extends React.Component{
    render(){
        return (    
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/" component={Admit}></Route>
                <Redirect to="/admin"></Redirect>
            </Switch>
         </BrowserRouter>  
        )       
    }
}