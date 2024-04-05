import React, { Component } from 'react';
import './update.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'

import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'
import { firest } from '../fr';

class UpdateProduct extends Component {
    state = {
        categories: [],
       category: '',
        imagePreview : '',
        message : '',
        messageadd: '',
      name: '',
      code: '',
uploading: false,
transferred: 0,
        products:[],
        vendor: '',
        tagline: '',
      type:'',
        stock: 0,
        description: '',
        success: false,
        loading: false,
        actualprice: '',
        saleprice: '',
        discount: '',
          description: '',
          file: null,
          imagePreview: '',
          filename:'',
          product:'',
          docid:''
    }

    
    componentDidMount(){
        const list = []
          firest.collection('Categories').get().then(documentSnap => {
            documentSnap.forEach(doc => {
               
                const {Name} = doc.data();
                list.push({Name:Name})
                
            })
            this.setState({categories:list})
        })
    
    this.FetchProducts();
        
    }

    selectCategory = (e) => {
        this.setState({
            category : e.target.value
        })
    }
        selectProduct = (e) => {
            this.setState({
                product : e.target.value
            })
           
        }
       
       FetchProducts = async() =>{
           const li = [];
           await firest.collection('Products').get().then((documentSnapshot)=>{
               documentSnapshot.forEach((doc)=>{
                   const {id} = doc.data();
                    li.push({
                        iD:id
                    })
               })
               this.setState({products:li})
           })
       }

       
    

    selectType = (e) => {
        this.setState({
            type : e.target.value
        })
    }
    

        selectTagline = (e) => {
            this.setState({
                tagline: e.target.value
            })
        }
    

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

   
handlename = (nam) => {

firest.collection('Products').get().then((documentSnapshot)=>{
    documentSnapshot.forEach((doc)=>{
        const {id,name} = doc.data();
        if(id === nam)
        {
           this.setState({name:name})
        }
    })
})


}

handlestock = (e) => {
    this.setState({
        stock: e.target.value
    })
}
selectVendor = (e) => {
    this.setState({
        vendor : e.target.value
    })}

    handleSubmit = () => {
      
        const { imagePreview, file,category, name, code,stock, actualprice,  description, vendor, type, tagline,saleprice,discount,transferred,uploading,product} = this.state
       
        
        

      
        
          
         
         
           firest.collection('Products').get().then((documentSnapshot)=>{
              documentSnapshot.forEach((doc)=>{
                  const{id} = doc.data();
               
                  if(id === product)
                  {
                     
                      
                   firest.collection('Products').doc(doc.id).update({
                    actualprice:actualprice,
                    saleprice:saleprice,
                    discount:discount,
                    stock:stock,
                   description:description
                    }).then(alert("Accepted Product Successfully"))
                  }
                })
            
            
            })
        
    
            
           
                    
                  
              
                   
           
        
    

        
                
        
            
        
        
    }

    
    render() {
        const { categories, subcategories, loading, imagePreview, allsize, allstock, name, code, size, stock, category_id, sub_category_id,actualprice,saleprice,discount, weight, description, message, messageadd, success, type, vendors,category, vendor, tagline,uploading,transferred,products,product} = this.state
        
        return (
            <div className="add-wrapper">
                <Header />
                <Navbar />
                <Link to='/products'>
                    <div className="cancel"><i className="demo-icon icon-cancel">&#xe80f;</i></div>
                </Link>
               
                <div className="add-product">
                    <h1>Update Products</h1>
                   

                   

                    <form onSubmit={this.handleSubmit}>
                      
                       
                        <label htmlFor="">Select Product ID</label>
                        <select value={product} onChange={this.selectProduct} name="productid" id="ids">
                            <option value="">select</option>
                            {
                                products.map(prod=>{
                                    return(
                                        <option  >{prod.iD}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Product Name</label>
                        <input value={name} onMouseOver={this.handlename(product)} name="product" type="text"/>
                        <label htmlFor="">Stock</label>
                        <input value={stock} onChange={this.handlestock} name="stock" type="number"/>
                        
                        

                       
                        
                      


                        <label htmlFor="">ActualPrice</label>
                        <input value={actualprice} placeholder="Rp" onChange={this.handleChange} name="actualprice" type="text"/>
                       
                        <label htmlFor="">SalePrice</label>
                        <input value={saleprice} placeholder="Rp" onChange={this.handleChange} name="saleprice" type="text"/>

                        <label htmlFor="">Discount</label>
                        <input value={discount} placeholder="Rp" onChange={this.handleChange} name="discount" type="text"/>

                        <label htmlFor="description">Description</label>

                        <ReactQuill className="description" value={description} onChange={ (value)=>this.setState({ description: value }) } id="description"/>

                        <span className="message">{message}</span>
                        
                        <button type="submit" >Save</button>
             
                    </form>
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

export default UpdateProduct;

