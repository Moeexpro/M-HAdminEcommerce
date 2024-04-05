import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Orders from './components/Orders'
import Products from './components/Products'
import Product from './components/Product'
import Categories from './components/Categories'
import AddProduct from './components/Product/AddProduct'
import UpdateProduct from './components/Product/Update'
import Customers from './components/Customers'
import Admin from './components/Admin'
import Vend from './components/Vendors Module'
import Inspect from './components/Inspection Module/index'
import Vendaccept from './components/Vendor Requests';
import AddInspection from './components/Inspection Requests/AddProduct';
import AddInspector from './components/Inspection Module/AddInspector';
import AddInspectionR from './components/Inspection Requests/AddInspection';
import Inspectors from './components/Inspectors Module';
import Order from './components/Orders/Order';
import Order2 from './components/Orders/Order2';
import Order3 from './components/Orders/Order3';
class App extends Component {
  componentDidMount() {
    const element = document.getElementById('startingLoader')
    window.onload = () => {
      if(element) {
        element.remove()
      }
    }
  }

  render() {
    const { user } = this.props
    return (
        <BrowserRouter>
          
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={Orders} />
            <Route path="/products" component={Products} />
            <Route path="/customers" component={Customers} />
            <Route path="/categories" component={Categories} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/product/:id" component={Product} />
            <Route path="/admin" component={Admin} />
            <Route path="/updateproduct/" component={UpdateProduct} />
            <Route path="/order1/" component={Order} />
            <Route path="/order2/" component={Order2} />
            <Route path="/order3/" component={Order3} />
            <Route path = "/Vendors" component={Vend}/>
            <Route path = "/VendorsRe" component={Vendaccept}/>
            <Route path = "/InspectorAdd" component={AddInspector}/>
            <Route path = "/Inspectors" component={Inspectors}/>
            <Route path = "/InspectionsRe" component={AddInspectionR}/>
           
            <Route path = "/Inspections" component= {Inspect}/>
            <Route path="/*" component={Home} />
          </Switch>
         
        
        </BrowserRouter>
    );
      }
    }


const mapStateToProps = (state) => {
  return({
      user: state.userReducer
  })
}

export default connect(mapStateToProps)(App);
