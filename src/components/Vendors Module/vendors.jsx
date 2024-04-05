import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'

class Vendors extends Component {

    render() {
        const { vendor } = this.props
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `vendor/${vendor.UserID}` , state: vendor }}>
            <div className="product">
                <div className="photo">
                    <Lazy ltIE9>
                    <img src= {vendor.File} style={{objectFit:'cover',float:'left',height:200,width:200}}/>
                    </Lazy>
                </div>
                <div className="name">
                    <div> Shop Name </div>
                    <span>{vendor.Name}</span>
                </div>
                <div className="code">
                    <div>Vendor Email</div>
                    <span>{vendor.email}</span>
                </div>
                <div className="price">
                    <div>Sales</div> <span>Rp {price(vendor.Sales)}</span>
                </div>
                <div className="code">
                    <div>Orders</div>
                    <span>{vendor.Orders}</span>
                </div>
               
            </div>
            </Link>
        );
    }
}

export default Vendors;