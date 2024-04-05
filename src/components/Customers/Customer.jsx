import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'

class Customer extends Component {

    render() {
        const { customer } = this.props
        return (
           
            <div className="product">
               
                <div className="name">
                    <div> Customer Name </div>
                    <span>{customer.username}</span>
                </div>
                <div className="name">
                    <div> Customer Email </div>
                    <span>{customer.email}</span>
                </div>
                <div className="name">
                    <div> Customer Phone </div>
                    <span>{customer.phone}</span>
                </div>
                <div className="name">
                    <div> Total Orders </div>
                    <span>{customer.Orders}</span>
                </div>
                <div className="code">
                    <div>Total Inspections</div>
                    <span>{customer.Inspections}</span>
                </div>
                <div className="price">
                    <div>Total Inspection Charges</div> <span>Rp {price(customer.InspectionChargesTotal)}</span>
                </div>
                <div className="price">
                    <div>Payment Pending</div> <span>Rp {price(customer.PaymentPending)}</span>
                </div>
                <div className="code">
                    <div>Address</div>
                    <span>{customer.Address}</span>
                </div>

               
            </div>
            
        );
    }
}

export default Customer;