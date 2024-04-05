import React, { Component } from 'react';
import './add.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import {firest} from '../fr'
class AddCategory extends Component {
    state = {
        name : '',
        message : ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit = async(e) => {
        const { name } = this.state        
        e.preventDefault()

      await firest.collection('Categories').add({
           Name:name
       })
       alert("Category added")
    }

    render() {
        const { name, message } = this.state
        return (
            <div>
                <div className="add-category">
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Add category" onChange={this.handleChange} value={name} name="name" type="text"/>
                        <button type="submit">Add</button>
                    </form>
                </div>
                <span className="message">{message}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps)(AddCategory);