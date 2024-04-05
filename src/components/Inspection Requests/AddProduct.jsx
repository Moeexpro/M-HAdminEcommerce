import React, { Component } from 'react';
import './addproduct.scss'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'
import {storage,firest} from '../fr';
import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'
import New from '../Orders/New';

class AddInspection extends Component {
    state = {
        ShopNames: [],
       categories: [],
        imagePreview : '',
        emai:'',
        shopname:'',
        category:'',
        productname:'',
uploading: false,
transferred: 0,
price:'',
Inspector:'',
        emails:[],
        ProductNames:[],
        codes:[],
        code:'',
        
        InspectionPrice: '',
      
          file: null,
        imagePreview:"",
        filename:"Inspections"
    }

    componentDidMount(){
        
       const shops = [];
       const em = [];
       const productn = [];
       const cat = [];
       const ids = [];
        firest.collection('Inspections').get().then(documentSnap => {
            
            documentSnap.forEach(doc => {
                const {Shop,category,email,ProductName,UploadedFile,ProductId} = doc.data();
                if(UploadedFile === false)
                {
                shops.push({Shop:Shop});
                em.push({email:email});
                productn.push({ProductName:ProductName});
                cat.push({category:category})
                ids.push({Id:ProductId})
                  this.setState({
                      ShopNames :shops,
                      ProductNames:productn,
                      emails:em,
                      categories:cat,
                      codes:ids
                  })
                }
            })
        
        })
    

    }

    selectCategory = (e) => {
        this.setState({
            category : e.target.value
        })

      
       

       
    }
    selectId = (e) =>{
        this.setState({
            code : e.target.value
        })
       }

    selectProductName = (e) => {
        this.setState({
            productname : e.target.value
        })
    }
    

        selectEmails = (e) => {
            this.setState({
            emai: e.target.value
            })
        }
        selectShopName = (e) => {
            this.setState({
            shopname: e.target.value
            })
        }

    selectInspector = (e) => {
        this.setState({
            Inspector : e.target.value
        })
    }

    selectPrice = (e) => {
        this.setState({
            price : e.target.value
        })
    }

    handleImage = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreview: reader.result
            })
        }
    }





    handleSubmit = async(e) => {
        e.preventDefault();
 const {file,price,Inspector,productname,emai,category,shopname,code} = this.state;
 
        
 this.setState({ loading: true })
 const imageurl = await this.uploadImage();
 
        await firest.collection('Inspections').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
                const {category,email,ProductName,Shop,ProductId} = doc.data();
                
                if(category===category && email === emai && ProductName === productname && Shop === shopname && code === ProductId)
                {
                    firest.collection('Inspections').doc(doc.id).update({
                        InspectorName:Inspector,
                        InspectionPrice:price,
                        InspectionFile:imageurl,
                        UploadedFile:true
                    })
                }
            })
        })
    

      
       
          
           
        } 
        
    

    uploadImage = async() => 
    {
        const {imagePreview,file,code} = this.state;
        console.log(file);
        const uploadUri = file;
        
        
        this.setState({uploading:true})
        this.setState({transferred:0})
        const storageRef = storage.ref(`inspections/${file.name}`);
        const task = storageRef.put(uploadUri);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
              `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
      
            this.setState({transferred:(
              Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100
            )});
          });
      
          try {
            
      await task;
            const url = await storageRef.getDownloadURL();
      
            this.setState({uploading:false})
            
      
            // Alert.alert(
            //   'Image uploaded!',
            //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            // );
            return url;
      
          } catch (e) {
            console.log(e);
            return null;
          }
        }

    render() {
        const { categories, ProductNames, Inspector,emails, imagePreview, allsize, ShopNames,category, emai, productname, shopname, sub_category_id,actualprice,saleprice,discount, weight, description, message, messageadd, success, type, vendors, vendor, tagline,uploading,transferred,name,price,code,codes} = this.state;
        return (
            <div className="add-wrapper">
                <Header />
                <Navbar />
                <Link to='/Inspections'>
                    <div className="cancel"><i className="demo-icon icon-cancel">&#xe80f;</i></div>
                </Link>
               
                <div className="add-product">
                    <h1>Upload Inspection Details</h1>
                   

                    <div className="photo">
                        <div className="image">
                            { imagePreview ? <img src={imagePreview} alt="imagePreview"/> : <div></div> } 
                        </div>
                        <label htmlFor="photo">Upload Inspection Image  <i className="demo-icon icon-picture">&#xe812;</i></label><br/>
                        <input onChange={this.handleImage} id="photo" type="file" accept="image/x-png,image/gif,image/jpeg"/>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="">Inspector Name</label>
                        <input value={Inspector} onChange={this.selectInspector} name="name" type="text"/>
                       
                        <label htmlFor="">Category</label>
                        <select value={category} onChange={this.selectCategory} name="category" id="category">
                            <option value="">select</option>
                            {
                                categories.map(categor=>{
                                    return(
                                        <option  >{categor.category}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Shop</label>
                        <select value={shopname} onChange={this.selectShopName} name="category" id="category">
                            <option value="">select</option>
                            {
                                ShopNames.map(shop=>{
                                    return(
                                        <option  >{shop.Shop}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="">Product ID</label>
                        <select value={code} onChange={this.selectId} name="productid" id="productid">
                            <option value="">select</option>
                            {
                                codes.map(cod=>{
                                    return(
                                        <option  >{cod.Id}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Select Product Name</label>
                        <select value={productname} onChange={this.selectProductName} name="vendor_id" id="vendor">
                            <option value="">select</option>
                            {
                                ProductNames.map(product=>{
                                    return(
                                        <option  >{product.ProductName}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="">Select Email</label>
                        <select value={emai} onChange={this.selectEmails} name="tagline_id" id="tagline">
                        <option value="">select</option>
                        {
                            
                                emails.map(email=>{
                                    
                                    return(
                                        <option  >{email.email}</option>
                                    )
                                })
                            }
                           
                        </select>
                        
                        
                        <label htmlFor="">Inspection Price</label>
                        <input value={price} placeholder="Rp" onChange={this.selectPrice} name="price" type="text"/>

                       
                        

                       
                        <span className="message">{message}</span>
                        { uploading? (
            
              <h1>{transferred} % Completed!</h1>
              ):(
                        <button type="submit" onClick={this.handleSubmit}>Save</button>
              )}
                    </form>
                </div>
            </div>
        );
    }
}
export default AddInspection;