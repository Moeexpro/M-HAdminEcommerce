import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Inspecto from './Inspectors';

import Header from '../Header'
import Navbar from '../Navbar'
import { firest } from '../fr';



class Inspectors extends Component {
    state = {
        show: 'card',
        loading : true,
        inspectors : [],
        
        comfirm_delete : true,
        top : '100px',
        search : ''
    }


    componentDidMount(){
        this.fetchInspectors()
       
      

        window.addEventListener('scroll', ()=>{
            let scroll =  window.scrollY
            if( scroll>0 ) {
                this.setState({ top: '65px' })
            } else {
                this.setState({ top: '100px' })
            }
        })
    }

   
   
 

    fetchInspectors = async() => {
        const list = [];
     await   firest.collection('Inspectors').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
                const {InspectorName,Inspections,InspectionSales,Category,InspectionPrice,Experience} = doc.data();
                    list.push({
                       InspectorName:InspectorName,
                       Category:Category,
                       InspectionSales:InspectionSales,
                       Inspections:Inspections,
                       InspectionPrice:InspectionPrice,
                       Experience:Experience
                    })
            })
        })
        this.setState({inspectors:list})
        
    }

   
  

    render() {
        const { top, loading, inspectors, show, categories, subcategories, sub_category_id,  message } = this.state
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">

                    <Link to="/InspectorAdd">
                    <div style={{ top: top, transition: '0.5s' }} className="new">
                        <i className="demo-icon icon-plus">&#xe808;</i>
                    </div>
                    </Link>

                    <span>Inspectors</span>

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
                                <input placeholder="Search inspector" onChange={(e)=>this.setState({ search: e.target.value })} type="search"/>
                                <button type="submit"><i className="demo-icon icon-search">&#xe806;</i></button>
                            </form>
                        </div>
                    </div>

                   <div className={show}>{ inspectors.map(num=> <div key={num} ><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                inspectors.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                            inspectors.map(inspector=> <Inspecto  inspector={inspector} /> )
                            }
                        </div>
                    

                </div>
            </div>
        );
    }
}


export default Inspectors;