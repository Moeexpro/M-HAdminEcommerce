import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'
import {firest} from '../fr'

class Product extends Component {


    state = {
        confirm_delete: true
    }

    deleteProduct(idm) {   
        firest.collection('Products').get().then(documemntSnapshot => {
            documemntSnapshot.forEach((doc)=>{
                const {id} = doc.data();
                if(id===idm)
                {
                    firest.collection('Products').doc(doc.id).delete();
                    console.log(doc.id)
                    alert("Deleted Product")
                }
            })
        })
     }


    render() {
        const { product } = this.props
        const {confirm_delete} = this.state;
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `product/${product.id}` , state: product }}>
            <div className="product">
                <div className="photo">
                    <Lazy ltIE9>
                    <div>Product Image</div>
                       <img src={product.Image} style={{objectFit:'cover',float:'left',height:200,width:200}}/>
                    </Lazy>
                </div>
                <div className="name">
                <div>Product Name</div>
                    <span>{product.name}</span>
                </div>
                <div className="name">
                <div>Product Category</div>
                    <span>{product.category}</span>
                </div>
                <div className="name">
                <div>Product Orders</div>
                    <span>{product.Orders}</span>
                </div>
                <div className="name">
                <div>Product Stock</div>
                    <span>{product.stock}</span>
                </div>
                <div className="code">
                    <div>Product ID</div>
                    <span>{product.id}</span>
                </div>
                <div className="price">
                    <div>Actual Price</div> <span>Rs {price(product.actualprice)}</span>
                </div>
                <div className="price">
                    <div>Sale Price</div> <span>Rs {price(product.saleprice)}</span>
                </div>
                <div className="code">
                    <div>Shop Name</div>
                    <span>{product.vendor}</span>
                </div>
                <div className="code">
                    <div>Type</div>
                    <span>{product.type}</span>
                </div>
                <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        { //open comfirm delete category
                    confirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{this.deleteProduct(product.id)}}>Yes</button>
                            <button onClick={()=>{this.setState({ confirm_delete: true })}}>No</button>
                        </div>
                    </div>
                }
            </div>
            </Link>
        );
    }
}

export default Product;