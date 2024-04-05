import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'
import './new.scss'
import Order4 from './Order4';
import Header from '../Header';
import Navbar from '../Navbar'
import { firest } from '../fr';
import './products.scss'

class Success extends Component {
    state = {
        orders: [],
        loading: true,
        detail: false,
        message: '',
        show: 'card',
        top : '100px'
    }

    componentDidMount(){
        this.fetchOrdersShipping()
    }

  async  fetchOrdersShipping(){
        let shipped = [];
      await  firest.collection('Orders').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
                const {OrderID,Cart,Price,DeliveryDate,PaymentMethod,Status,Email,InspectionPrice,DeliveryCharges} = doc.data();
                if(Status === 'Delivered')
                {
                    shipped.push({
                        OrderID:OrderID,
                      Cart:Cart,
                      Price:Price,
                      DeliveryDate:DeliveryDate,
                      PaymentMethod:PaymentMethod,
                      Status:Status,
                      InspectionPrice:InspectionPrice,
                      DeliveryCharges:DeliveryCharges,
                      Email:Email
                    })
                }
            })
        })
        this.setState({orders:shipped})
    }

    

    render() {
        const { orders, loading, message,show } = this.state
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">


                    <span>Completed Orders</span>

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

                  
                        <div className={show}>{ orders.map(num=> <div key={num.Name}><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                orders.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                orders.map(order=> <Order4 order={order}/> )
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

export default connect(mapStateToProps)(Success);