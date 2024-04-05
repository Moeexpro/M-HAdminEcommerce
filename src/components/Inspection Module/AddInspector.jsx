import React, { Component } from 'react';
import './addproduct.scss'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'
import {firest} from '../fr';
import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'
import New from '../Orders/New';
import emailjs from 'emailjs-com'

class AddInspector extends Component {
    state = {
       InspectorName:'',
       Category:'',
       Experience:'',
       AccountNo:'',
       categories:[],
       Bank:'',
       Email:'',
       InspectionPri:0
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
       
    

    }

    selectCategory = (e) => {
        this.setState({
            Category : e.target.value
        })

      
       

       
    }
    

    selectInspectorName = (e) => {
        this.setState({
            InspectorName : e.target.value
        })
    }
    
    selectInspectorEmail = (e) => {
        this.setState({
            Email : e.target.value
        })
    }

        selectExperience = (e) => {
            this.setState({
            Experience: e.target.value
            })
        }

        selectAccountNo = (e) => {
            this.setState({
            AccountNo: e.target.value
            })
        }

        selectBank = (e) => {
            this.setState({
            Bank: e.target.value
            })
        }


        selectPrice = () => {
            const{Experience,InspectionPri} = this.state;
           
            const InspectPrice = 0;
       if(Experience === "Entry-level")
       {
        this.setState({
            InspectionPri:1000
        })
       }
       if(Experience === "Intermediate")
       {
        this.setState({
            InspectionPri:1500
        })
       }
       if(Experience === "Expert")
       {
        this.setState({
            InspectionPri:2000
        })
       }
            
        }

   

   




    handleSubmi = (e) => {
       e.preventDefault();
     const {InspectorName,InspectionPri,Experience,Category,AccountNo,Bank,Email} = this.state; 
     const price = parseInt(InspectionPri);
        
if(InspectorName && InspectionPri && Experience && Category && AccountNo && Bank && Email)
{

    var idm = "Inspector" + Math.random().toString(16).slice(2);
   firest.collection('Inspectors').add({
       InspectorID:idm,
      InspectorName:InspectorName,
      InspectorEmail:Email,
      Category:Category,
      InspectionPrice:price,
      Experience:Experience,
      AccountNumber:AccountNo,
      Bank:Bank,
      Inspections:0,
      InspectionSales:0
  })
  alert("Inspector Added Succuessfully");
  this.props.history.push('/');
}
else
{
    alert("Fill Up all the Details")
}
emailjs.sendForm('service_zz7jv7j','template_dst6ds6',e.target,'user_IysEjvYY1JLkHOfMikEnL').then(res=>{
    console.log(res);
}).catch(err=>{console.log(err)})
           
        } 
        
    

   

    render() {
        const { InspectionPri,InspectorName,Experience,Category,categories,AccountNo,Bank,Email} = this.state;
        return (
            <div className="add-wrapper">
                <Header />
                <Navbar />
               
               
                <div className="add-product">
                    <h1>Add Inspector</h1>
                   

                   

                    <form onSubmit={this.handleSubmi} >
                        <label htmlFor="">Inspector Name</label>
                        <input value={InspectorName} onChange={this.selectInspectorName} name="name" type="text"/>
                       
                        <label htmlFor="">Inspector Email</label>
                        <input name="user_email" type="email" className="form-control" id="email" value={Email} onChange={this.selectInspectorEmail} placeholder="you@gmail.com"/>

                        <label htmlFor="">Category</label>
                        <select value={Category} onChange={this.selectCategory} name="category" id="category">
                            <option value="">select</option>
                            {
                                categories.map(categor=>{
                                    return(
                                        <option  >{categor.Name}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="">Experience In Tech</label>
                        <select value={Experience} onChange={this.selectExperience} >
                            <option >select</option>
                            <option >Entry-level</option>
                            <option >Intermediate</option>
                            <option >Expert</option>

                      
                            </select>

                       
                        
                        
                        <label htmlFor="">Inspection Price</label>
                        <input value={InspectionPri} onMouseOver={this.selectPrice} name="price" type="number"/>

                       
                        
                        <label htmlFor="">Account No</label>
                        <input value={AccountNo} onChange={this.selectAccountNo} name="price" type="text"/>


                        <label htmlFor="">Select Bank</label>
                        <select value={Bank} onChange={this.selectBank} >
                            <option >select</option>
                            <option >Faysal Bank</option>
                            <option >Allied Bank</option>
                            <option >JS Bank</option>
                            <option >Meezan Bank</option>
                            <option >Habib Bank Limited</option>
                            <option >Jazz Cash</option>
                            </select>
                     
                        
                        <input type="submit" value="Submit"/>
            
                    </form>
                </div>
            </div>
        );
    }
}
export default AddInspector;

