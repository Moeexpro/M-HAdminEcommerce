import React, { Component } from 'react';
import './categories.scss'
import axios from 'axios'
import _ from 'lodash'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import {firest,auth} from '../fr'
import Header from '../Header'
import Navbar from '../Navbar'
import AddCategory from './AddCategory'
import Category from './Category'

class index extends Component {
    state = {
        new_category: true,
        categories: [],
        loading: true,
    }
    
    componentDidMount(){
        let category = localStorage.getItem('categories')
        if(_.isString(category)){
            let categories = JSON.parse(category)
            if(_.isArray(categories))
                this.setState({ categories, loading: false })
        }
        this.fetchCategories()
    }

    fetchCategories = () => {
        const list = [];
       firest.collection('Categories').get().then(documentSnapshot => {
           documentSnapshot.forEach((doc) => {
               const {Name} = doc.data();
               list.push({Name:Name})
           })
           this.setState({categories:list})
           alert(list)
       })
    }

    newCategory = () => {
        this.setState({ new_category: !this.state.new_category })
    }

    render() {
        const { new_category, categories, loading } = this.state
        return (
            <div className="categories">
                <Header />
                <Navbar />

              <div className="wrapper"> { categories.map(category=>{ return(<div key={category.Name} className="loading-list"></div>) }) }</div> :
                

                <div className="wrapper">
                    <span>Categories</span>

                    {/* Button for add category */}
                    <div onClick={this.newCategory} className="new">
                       { !new_category ? <i className="demo-icon icon-cancel">&#xe80f;</i> : <i className="demo-icon icon-plus">&#xe808;</i> } 
                    </div>

                    {/* Component for input new category */}
                    { new_category ? '' : <AddCategory update={this.fetchCategories} />  }

                    {/* List all categories */}
                    {
                        categories.map(category=>{
                            return(
                                <Category key={category.Name} update={this.fetchCategories} category={category} />
                            )
                        })
                    }

                </div>

                

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        category: state. categoriesReducer
    })
}

export default connect(mapStateToProps, { categoryAction })(index);