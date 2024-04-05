import React, { Component } from 'react';

import { url, headers} from '../../config'
import _ from 'lodash'

import './new.scss'
import { firest } from '../fr';
import Header from '../Header'
import Navbar from '../Navbar'
import Order from './Order'
import './products.scss'
import axios from 'axios'

import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'


class New extends Component {
    state = {
        orders: [],
        loading: true,
        message: '',
        show: 'card',
        loading : true,
        
        
        
        top : '100px'
        
    }

    componentDidMount(){
        this.fetchOrdersUnconfirmed()
    }

  async fetchOrdersUnconfirmed(){
        const list = [];
      await firest.collection('Orders').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
                const {OrderID,Cart,Price,DeliveryDate,PaymentMethod,Status,Email,DeliveryCharges,InspectionPrice,Address,username} = doc.data();
               if(Status === 'Pending')
               {

                    list.push({
                        OrderID:OrderID,
                      Cart:Cart,
                      Price:Price,
                      DeliveryDate:DeliveryDate,
                      PaymentMethod:PaymentMethod,
                      Status:Status,
                      DeliveryCharges:DeliveryCharges,
                      InspectionPrice:InspectionPrice,
                      Email:Email,
                      Address:Address,
                      username:username

                    })
               }
            })
        
        })
       
        this.setState({orders:list})
        
    }

   

    render() {
        const { orders, loading, message,show } = this.state
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">


                    <span>New Orders</span>

                    <div className="show">
                        <div className={ show === 'card' ? 'active' : '' } onClick={()=> this.setState({ show: 'card' })}>
                            <span>cards</span>
                        </div>
                        <div className={ show === 'table' ? 'active' : '' }  onClick={()=> this.setState({ show: 'table' })} >
                            <span>table</span>
                        </div>
                    </div>

                    <div className="wrapper-search">
                        <div className="search">
                           
                        </div>

                        

                        <div className="search-input">
                            <form onSubmit={this.searchProduct}>
                                <input placeholder="Search Orders" onChange={(e)=>this.setState({ search: e.target.value })} type="search"/>
                                <button type="submit"><i className="demo-icon icon-search">&#xe806;</i></button>
                            </form>
                        </div>
                    </div>

                  
                        <div className={show}>{ orders.map(num=> <div key={num.Name} ><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                orders.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                orders.map(order=> <Order  order={order} his={this.props.history}/> )
                            }
                        </div>
    

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user : state.userReducer
    })
}

export default connect(mapStateToProps)(New);