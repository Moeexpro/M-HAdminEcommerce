import React, { Component } from 'react';
import _ from 'lodash'
import { price, url, headers } from '../../config'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { firest } from '../fr';

 
class Order extends Component {

    acceptOrder = (e) => {
        
        e.preventDefault();
     const {order,his} = this.props;
    
    firest.collection('Orders').get().then((documentSnapshot)=>{
        documentSnapshot.forEach((doc)=>{
            const {OrderID} = doc.data();
            if(OrderID === order.OrderID)
            {
                firest.collection('Orders').doc(doc.id).update({
                   Status:'Confirmed'
                }).then(()=>{
                       
                    alert('Order Confirmed Successfully');
                    window.location.reload('false');

                                        })
                                    }
        })
        
    })
   
    
    
    }
    
    rejectOrder = (orderid) => {
        const {order} = this.props;
        var pid = '';
        firest.collection('Products').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
              const{id} = doc.data();
          order.Cart.map((item)=>{

if(id === item.id)
{
pid = id;
firest.collection('Products').get().then((documentSnapshot)=>{
documentSnapshot.forEach((doc)=>{
 const {id,stock,Orders} = doc.data();
var st = parseInt(stock);
 if(id === pid )
 {
  
   firest.collection('Products').doc(doc.id).update({
     
     Orders: Orders - 1,
     stock:st + 1
   })
 }
})

})
}
})
          })
        })
                 


          
        firest.collection('Orders').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
                const {OrderID} = doc.data();
                if(OrderID === orderid)
                {
                    firest.collection('Orders').doc(doc.id).delete().then(alert("Rejected Order Successfully"))
                  
                }
            })
        }).then(()=>{window.location.reload('false')})
       
    }
        render() {
            const {order} = this.props
            var carm = order.Cart.map((item)=> (

   

         
                <div className="col-md-4 order-md-2 mb-4">
                  
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Product name</h6>
                        <small className="text-muted">{item.name}</small>
                      </div>
                      <div>
                        <h6 className="my-0">Product price</h6>
                        <small className="text-muted">{item.saleprice}</small>
                      </div>
                    </li>
                   </ul>
                </div>
                    
                )
                    )
                    
          
            return (
               
                <div className="product">
                    <div className="photo">
                       
                    </div>
                    <div className="code">
                        <div>Order ID</div>
                        <span>{order.OrderID}</span>
                    </div>
                    <div className="code">
                        <div>Order Total</div>
                        <span>{order.Price}</span>
                    </div>
                    <div className="code">
                        <div>Inspection Charges</div>
                        <span>{order.InspectionPrice}</span>
                    </div>
                    <div className="code">
                        <div>Delivery Charges</div>
                        <span>{order.DeliveryCharges}</span>
                    </div>
                    <div className="name">
                        <div> Order Details </div>
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
   
   
  </h4>
{carm}
                    </div>
                    <div className="code">
                        <div>Status</div>
                        <span>{order.Status}</span>
                    </div>
                    <div className="code">
                        <div>Customer Email</div>
                        <span>{order.Email}</span>
                    </div>
                    <div className="code">
                        <div>Delivery Date (Targeted)</div>
                        <span>{order.DeliveryDate}</span>
                    </div>
                    <div className="code">
                        <div>Confirm Order</div>
                        <form onSubmit={this.acceptOrder} >
                            
                           
                      <input type="submit" value="Confirm Order"/>
                       </form>
                    </div>
                    <div className="code">
                        <div>Reject Order</div>
                       <button title="Reject Order" onClick={()=>{this.rejectOrder(order.OrderID)}}></button>
                    </div>
                   
                   
                </div>
                
            );
        }
    }
    
    
    
    export default Order;