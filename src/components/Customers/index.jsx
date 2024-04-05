import React, { Component } from 'react';
import './customers.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import { firest } from '../fr';
import Header from '../Header'
import Navbar from '../Navbar'
import Customer from './Customer';

class index extends Component {
    state = {
        customers : [],
        loading : true,
        show: 'card',
    }

    componentDidMount() {
         const list = [];
        let customers = JSON.parse(localStorage.getItem('customers'))
        if(customers){
            this.setState({ customers, loading: false })
        }
        
       firest.collection('users').get().then((documentSnapshot) => {
           documentSnapshot.forEach((doc)=>{
const { username,
    email,
    phone,
    Orders,
    Inspections,Address,PaymentPending,State,InspectionChargesTotal} = doc.data();
    list.push({
        email:email,
        phone:phone,
        username:username,
        Orders:Orders,
        Inspections:Inspections,
        PaymentPending:PaymentPending,
        State:State,
        Address:Address,
        InspectionChargesTotal:InspectionChargesTotal
    })
           })
       })
       console.log(list)
       this.setState({customers:list})
    }

    render() {
        const { customers, loading,show } = this.state
        return (
            <div className="products">
            <Header />
            <Navbar />
<div className="wrapper">





<span>Customers</span>

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
            <input placeholder="Search customer" onChange={(e)=>this.setState({ search: e.target.value })} type="search"/>
            <button type="submit"><i className="demo-icon icon-search">&#xe806;</i></button>
        </form>
    </div>
</div>

<div className={show}>{ customers.map(num=> <div key={num} ><div></div><div></div><div></div></div> ) }</div> :
    <div className={show}>
        { //list all products
            customers.length === 0 ? <span style={{color: "red"}}>Empty</span> :
        customers.map(customer=> <Customer  customer={customer} /> )
        }
    </div>


</div>
</div>
                    
        );
    }
}


const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps)(index);