import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'
import {firest} from '../fr'
import emailjs from 'emailjs-com'
class VendorsRequests extends Component {
acceptVendor = (e) => {
    e.preventDefault();
 const {vendorm} = this.props;

firest.collection('Vendors').get().then((documentSnapshot)=>{
    documentSnapshot.forEach((doc)=>{
        const {shopID} = doc.data();
        if(shopID === vendorm.shopID)
        {
            firest.collection('Vendors').doc(doc.id).update({
                Approved:true
            }).then(alert("Accepted Vendor Successfully"))
        }
    })
})
emailjs.sendForm('service_zz7jv7j','template_yboxchi',e.target,'user_IysEjvYY1JLkHOfMikEnL').then(res=>{
    console.log(res);
    this.props.history.push('/');
}).catch(err=>{console.log(err)})


}

rejectVendor = (shopid) => {
    firest.collection('Vendors').get().then((documentSnapshot)=>{
        documentSnapshot.forEach((doc)=>{
            const {shopID} = doc.data();
            if(shopID === shopid)
            {
                firest.collection('Vendors').doc(doc.id).delete().then(alert("Rejected Vendor Successfully"))
              
            }
        })
    })
    this.props.history.push('/');
}
    render() {
        const { vendorm } = this.props
       
        return (
           
            <div className="product">
                <div className="photo">
                    <Lazy ltIE9>
                    <img src= {vendorm.File} style={{objectFit:'cover',float:'left',height:200,width:200}}/>
                    </Lazy>
                </div>
                <div className="code">
                    <div>Shop ID</div>
                    <span>{vendorm.shopID}</span>
                </div>
                <div className="name">
                    <div> Shop Name </div>
                    <span>{vendorm.Name}</span>
                </div>
                <div className="code">
                    <div>Vendor Email</div>
                    <span>{vendorm.email}</span>
                </div>
                <div className="code">
                    <div>Accept Vendor</div>
                    <form onSubmit={this.acceptVendor} >
                        <input type= "text" name="Name" value={vendorm.Name}/>
                        <input type= "email" name="Shop_Email" value={vendorm.email}/>
                       
                  <input type="submit" value="Accept Vendor"/>
                   </form>
                </div>
                <div className="code">
                    <div>Reject Vendor</div>
                   <button title="Reject" onClick={()=>{this.rejectVendor(vendorm.shopID)}}></button>
                </div>
               
               
            </div>
            
        );
    }
}

export default VendorsRequests;