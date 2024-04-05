import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import VendorsRequests from './vendors'
import Header from '../Header'
import Navbar from '../Navbar'
import { firest } from '../fr';


class Vendaccept extends Component {
    state = {
        show: 'card',
        loading : true,
        vendors : [],
       
        
        top : '100px',
        search : ''
    }

    componentDidMount(){
        this.fetchvendors()
        
        

       
    }

    fetchvendors = async() => {
        const list = [];
       await firest.collection('Vendors').get().then(documentSnapshot => {
            documentSnapshot.forEach((doc)=>{
             const {Name,
                email,
                phone,
                shopID,
                UserID,
                File,
                Orders,
                Sales,
                Approved
            } = doc.data();
            
            if(Approved === false)
            {
            list.push({
                Name:Name,
                email:email,
                phone:phone,
                shopID:shopID,
                UserID:UserID,
                File:File,
                Orders:Orders,
                Sales:Sales
            })
        }
    })
})
        this.setState({vendors:list});
       
    }
    

    
   
    

    
   
    searchProduct = (e) => {
        e.preventDefault()
        axios.get( url + "/vendor?search=" + this.state.search )
        .then(res =>{
            if(_.isArray(res.data)){
                this.setState({ products: res.data })
            }
        })
    }

    render() {
        const { top, loading, vendors, show, categories, subcategories, sub_category_id,  message } = this.state
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

                    <span>Vendors Requests</span>

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
                                <input placeholder="Search Vendors" onChange={(e)=>this.setState({ search: e.target.value })} type="search"/>
                                <button type="submit"><i className="demo-icon icon-search">&#xe806;</i></button>
                            </form>
                        </div>
                    </div>

                  
                        <div className={show}>{ vendors.map(num=> <div key={num.Name} ><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all vendors
                                vendors.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                vendors.map(vendor=> <VendorsRequests  vendorm={vendor}/> )
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

export default connect(mapStateToProps , { categoryAction })(Vendaccept);