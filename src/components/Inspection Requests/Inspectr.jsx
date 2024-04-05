import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'
import {firest,auth,storage} from '../fr'

class InspectR extends Component {

    state = {
        uploading:'false',
        image:'',
        transferred:0,

    }

    
    handleImage = (e) => {
       
        let file = e.target.files[0]
        alert(file)
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            
            this.setState({image:file})
        }
      
    }

    submitinspection = async(product)=>{
        const inm = await this.uploadImage();
if(inm)
{

 await firest.collection('Inspections').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
               
                const {category,email,ProductName,Shop,ProductId} = doc.data();
                
                if(email === product.email && ProductName === product.ProductName  && Shop === product.Shop && product.ProductId === ProductId)
                {
                    const pr = product.InspectionPrice - 500;
                    firest.collection('Inspectors').get().then((documentSnapshot)=>{
                        documentSnapshot.forEach((doc)=>{
                            const{InspectorName,Inspections,InspectionPrice,InspectionSales} = doc.data();
                            if(InspectorName === product.InspectorName)
                            {
                                firest.collection('Inspectors').doc(doc.id).update({
                                    Inspections:Inspections + 1,
                                    InspectionSales: InspectionSales + pr
                                })
                            }
                        })
                    })
                    firest.collection('Inspections').doc(doc.id).update({
                        
                        InspectionFile:inm,
                        UploadedFile:true
                    }).then(()=>{
                       
                        alert('Inspection file Uploaded Completely');
                        window.location.reload('false');

                                            }
                        
                       
                       
                    )
                }
            })
        })
      
    }
    else
    {
        alert("Please Upload Inspection File")
    }
  
    }



 uploadImage = async() => {
        {
            const {image} = this.state;
            
            const uploadUri = image;
           
            const {product} = this.props;
        
           this.setState({uploading:true})
            this.setState({transferred:0})
            const storageRef = storage.ref(`inspections/${"Inspections" + Math.random().toString(16).slice(2)}`);
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
    }

    render() {
        const { product } = this.props
        const{transferred,uploading} = this.state;
      
        return (
           
            <div className="product">
               
                <div className="name">
                <div>Product Name</div>
                    <span>{product.ProductName}</span>
                </div>
                <div className="code">
                    <div>Product ID</div>
                    <span>{product.ProductId}</span>
                </div>

                <div className="code">
                    <div>User Email</div>
                    <span>{product.email}</span>
                </div>
                <div className="price">
                    <div>Inspection Price</div> <span>Rs {price(product.InspectionPrice)}</span>
                </div>
                <div className="code">
                    <div>Shop Name</div>
                    <span>{product.Shop}</span>
                </div>

                <div className="code">
                    <div>Inspector Name</div>
                    <span>{product.InspectorName}</span>
                </div>
                <div className="code">
                    <div>Inspector Level</div>
                    <span>{product.InspectorLevel}</span>
                </div>
                <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                      
                    <div className="comfirm-delete">
                        <div>
                           
                        <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files"><label className="my-auto">Upload Inspection Document Here </label> <input id="file" onChange={this.handleImage} type="file" className="form-control" accept="image/x-png,image/gif,image/jpeg" /></div>
                            </div>
                            
                        </div>

                        <div className="row justify-content-end mb-5">
                               
                    
                      <div className="col-lg-4 col-auto "><button type="button" onClick={()=>{this.submitinspection(product)}} className="btn btn-primary btn-block"><small className="font-weight-bold">Submit Inspection</small></button> </div>
            
                        
                                </div>
                    </div>
                
            </div>
            
        );
    }
}

export default InspectR;