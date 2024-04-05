import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import InspectR from './Inspectr';

import Header from '../Header'
import Navbar from '../Navbar'
import { firest } from '../fr';


class AddInspectionR extends Component {
    state = {
        show: 'card',
        loading : true,
        inspections : [],
        categories : [],
        comfirm_delete : true,
        top : '100px',
        search : ''
    }


    componentDidMount(){
        this.fetchInspections()
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

   
 

    fetchInspections = async() => {
        const list = [];
        firest.collection('Inspections').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
             const {ProductId,
                Shop,
                ProductImage,
                ProductName,
                userid,
                email,
                phone,
                InspectionPrice,
                InspectionFile,
                InspectorName,
                InspectorLevel,
                UploadedFile
            } = doc.data();
           
            if(UploadedFile === false)
            {
            list.push({
                ProductId:ProductId,
                Shop:Shop,
                ProductImage:ProductImage,
                ProductName:ProductName,
                userid:userid,
                email:email,
                phone:phone,
                InspectionPrice:InspectionPrice,
                InspectionFile:InspectionFile,
                InspectorName:InspectorName,
                InspectorLevel:InspectorLevel,
                UploadedFile:UploadedFile
            })
        }
    })

})
console.log(list)
        this.setState({inspections:list})
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
        const { top, loading, inspections, show, categories, subcategories, sub_category_id,  message } = this.state
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

                    <span>Inspection Requests</span>

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
                                <input placeholder="Search Inspection " onChange={(e)=>this.setState({ search: e.target.value })} type="search"/>
                                <button type="submit"><i className="demo-icon icon-search">&#xe806;</i></button>
                            </form>
                        </div>
                    </div>

                   <div className={show}>{ inspections.map(num=> <div key={num} className="loading-list"><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                inspections.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                inspections.map(product=> <InspectR key={product.ProductId} product={product} /> )
                            }
                        </div>
                    

                </div>
            </div>
        );
    }
}



export default AddInspectionR;