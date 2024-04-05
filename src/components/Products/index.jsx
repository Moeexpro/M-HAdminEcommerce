import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Product from './Product'
import Header from '../Header'
import Navbar from '../Navbar'
import { firest } from '../fr';


class index extends Component {
    state = {
        show: 'card',
        loading : true,
        products : [],
        categories : [],
        comfirm_delete : true,
        top : '100px',
        search : ''
    }


    componentDidMount(){
        this.fetchProducts()
        let category = localStorage.getItem('categories')
    
        if(_.isString(category)){
            let categories = JSON.parse(category)
            if(_.isArray(categories))
                this.setState({ categories, loading: false })
        }
        this.fetchCategories()

        window.addEventListener('scroll', ()=>{
            let scroll =  window.scrollY
            if( scroll>0 ) {
                this.setState({ top: '65px' })
            } else {
                this.setState({ top: '100px' })
            }
        })
    }

    fetchCategories = () => {
        const list = [];
       firest.collection('Categories').get().then((documentSnapshot => {
           documentSnapshot.forEach((doc) => {
            
               const {Name} = doc.data();
               list.push({Name:Name})
           })
       }))
       this.setState({categories:list});
    }

   
 

    fetchProducts = async() => {
        const list = [];
     await   firest.collection('Products').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
                const {name,
                    id,
                    category,
                    vendor,
                    actualprice,
                    saleprice,
                    discount,
                    stock,
                    description,
                    type,
                    Image,
                    Orders,
                    
                    tagline} = doc.data();
                    list.push({
                        name,
                        id:id,
                        category:category,
                        vendor:vendor,
                        actualprice:actualprice,
                        saleprice:saleprice,
                        discount:discount,
                        stock:stock,
                        description:description,
                        type:type,
                        Image:Image,
                        tagline:tagline,
                        Orders:Orders,
                        
                    })
            })
        })
        this.setState({products:list})
        
    }

   
    searchProduct = (e) => {
        e.preventDefault()
        axios.get( url + "/product?search=" + this.state.search )
        .then(res =>{
            if(_.isArray(res.data)){
                this.setState({ products: res.data })
            }
        })
    }

    render() {
        const { top, loading, products, show, categories, subcategories, sub_category_id,  message } = this.state
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">

                    <Link to="/addproduct">
                    <div style={{ top: top, transition: '0.5s' }} className="new">
                        <i className="demo-icon icon-plus">&#xe808;</i>
                    </div>
                    </Link>

                    <span>Products</span>

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
                                <input placeholder="Search product" onChange={(e)=>this.setState({ search: e.target.value })} type="search"/>
                                <button type="submit"><i className="demo-icon icon-search">&#xe806;</i></button>
                            </form>
                        </div>
                    </div>

                   <div className={show}>{ products.map(num=> <div key={num} ><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                products.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                products.map(product=> <Product key={product.id} product={product} /> )
                            }
                        </div>
                    

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        categories : state.categoriesReducer,
        user : state.userReducer
    })
}

export default connect(mapStateToProps , { categoryAction })(index);