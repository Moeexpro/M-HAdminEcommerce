import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Vendors from './vendors';
import Header from '../Header'
import Navbar from '../Navbar'
import { firest } from '../fr';


class Vend extends Component {
    state = {
        show: 'card',
        loading : true,
        vendors : [],
       
        
        top : '100px',
        search : ''
    }

    fetchvendors = async() => {
        const list = [];
      await firest.collection('Vendors').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
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
            
            list.push({
                Name:Name,
                email:email,
                phone:phone,
                shopID:shopID,
                UserID:UserID,
                File:File,
                Orders:Orders,
                Sales:Sales,
                Approved:Approved
            })
           
    })

})

this.setState({vendors:list});
    }
    


    componentDidMount(){
        this.fetchvendors()
        
        

        window.addEventListener('scroll', ()=>{
            let scroll =  window.scrollY
            if( scroll>0 ) {
                this.setState({ top: '65px' })
            } else {
                this.setState({ top: '100px' })
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

                   
                    <div style={{ top: top, transition: '0.5s' }} className="new">
                        <i className="demo-icon icon-plus">&#xe808;</i>
                    </div>
                  

                    <span>Vendors</span>

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

                        

                      
                    </div>

                    
                       <div className={show}>{ vendors.map(num=> { if(num.Approved === true){return(<div key={num} ><div></div><div></div><div></div></div> )}}) }</div> :
                        <div className={show}>
                            { //list all vendors
                            
                                vendors.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                vendors.map(vendor=> {if(vendor.Approved===true){return(<Vendors key={vendor.UserID} vendor={vendor} />)}})
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

export default Vend;