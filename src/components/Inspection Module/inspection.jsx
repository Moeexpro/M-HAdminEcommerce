import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'

class Inspections extends Component {

    render() {
        const { inspection } = this.props
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `inspector/${inspection.ProductId}` , state: inspection }}>
            <div className="product">
                <div className="photo">
                    <Lazy ltIE9>
                    <img src= {inspection.InspectionFile} style={{objectFit:'cover',float:'left',height:200,width:200}}/>
                    </Lazy>
                </div>
                <div className="name">
                    <div> Product Name </div>
                    <span>{inspection.ProductName}</span>
                </div>
                <div className="name">
                    <div> Customer Email </div>
                    <span>{inspection.email}</span>
                </div>
                <div className="name">
                    <div> Product Image </div>
                    <span>{inspection.ProductImage}</span>
                </div>
                <div className="code">
                    <div>Shop</div>
                    <span>{inspection.Shop}</span>
                </div>
                <div className="price">
                    <div>Inspection Price</div> <span>Rp {price(inspection.InspectionPrice)}</span>
                </div>
                <div className="code">
                    <div>Inspector Name</div>
                    <span>{inspection.InspectorName}</span>
                </div>

               
            </div>
            </Link>
        );
    }
}

export default Inspections;