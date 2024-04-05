import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'
import {firest} from '../fr'

class Inspecto extends Component {


    state = {
        confirm_delete: true
    }

    deleteProduct(idm) {   
        firest.collection('Inspectors').get().then(documemntSnapshot => {
            documemntSnapshot.forEach((doc)=>{
                const {InspectorID} = doc.data();
                if(InspectorID===idm)
                {
                    firest.collection('Inspectors').doc(doc.id).delete();
                    console.log(doc.id)
                    alert("Deleted Inspector")
                }
            })
        })
     }


    render() {
        const { inspector  } = this.props
        const {confirm_delete} = this.state;
        return (
           
            <div className="product">
                
                <div className="name">
                <div>Inspector Name</div>
                    <span>{inspector.InspectorName}</span>
                </div>
                <div className="code">
                    <div>Inspector Category</div>
                    <span>{inspector.Category}</span>
                </div>
                <div className="name">
                    <div>Experience</div>
                    <span>{inspector.Experience}</span>
                </div>
                <div className="price">
                    <div>Inspection Price Per Inspection</div> <span>Rs {price(inspector.InspectionPrice)}</span>
                </div>
                <div className="code">
                    <div>Inspector Sales</div>
                    <span>Rs{price(inspector.InspectionSales)}</span>
                </div>
                <div className="code">
                    <div>Inspections Completed</div>
                    <span>{inspector.Inspections}</span>
                </div>
                <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        { //open comfirm delete category
                    confirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{this.deleteProduct(inspector.InspectorID)}}>Yes</button>
                            <button onClick={()=>{this.setState({ confirm_delete: true })}}>No</button>
                        </div>
                    </div>
                }
            </div>
           
        );
    }
}

export default Inspecto;