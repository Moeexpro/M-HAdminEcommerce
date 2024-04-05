import React, { Component } from 'react';
import './product.scss'
import axios from 'axios'
import { url, headers, price } from '../../config'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import {firest,storage,auth} from '../fr'
import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        product : {},
        comfirm_delete: true,
        message: '',
        loading: true
    }

    deleteProduct(id) {   
        axios.delete( url+ '/product/' + id , headers(this.props.user.token) )
        .then(res=>{
            this.props.history.push("/products")
        })
        .catch(err=>{
            this.setState({ message: 'Failed delete', comfirm_delete: false })
        })
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                product: this.props.location.state.product,
                loading: false
            })
        }
         else {

            let id = this.props.match.params.id
            axios( url + "/product/" + id )
            .then(res=>{
                if(res.data){
                    this.setState({
                        product: res.data,
                        loading: false
                    })
                }
            })
        }
    }


    render() {
        const { product, comfirm_delete, message, loading } = this.state
        return (
            <div className="detail-product">
                <Header />
                <Navbar />

                { //open comfirm delete category
                    comfirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{this.deleteProduct(product.id)}}>Yes</button>
                            <button onClick={()=>{this.setState({ comfirm_delete: true })}}>No</button>
                        </div>
                    </div>
                }
                <div className="top">
                    <div className="back">
                       
                    </div>

                    <div className="action">
                        <div onClick={()=>{this.setState({ comfirm_delete: false })}} className="delete">
                            <i  className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        
                        <div className="update">
                            <i className="demo-icon icon-cog">&#xe81a;</i>
                        </div>
                    
                    </div>
                </div>
                <div>
                    <div className="wrapper">

                        <div className="image">
                            { loading ? <div className="load"></div> :
                            <img src={product.Image} alt=""/> }
                        </div>
                        <div className="detail">
                            <span className="message">{message}</span>

                            <div className="box">
                            <div className="name">
                                <span>{product.name}</span> 
                            </div>
                            <div className="code">
                                Code Product <br/>
                                <span>{product.code}</span> 
                            </div>
                            <div className="category">
                                <div>
                                    Category <br/>
                                     <span>{product.category}</span> 
                                </div>
                                
                            </div>
                            
                           </div>

                            <div className="price">
                                SalePrice <br/>
                                <span>Rp {price(product.saleprice)}</span> 
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        Description <br/>
                        <div dangerouslySetInnerHTML={{__html:product.description}}></div>                      
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