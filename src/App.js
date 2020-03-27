import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

import axios from 'axios'

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
        gifs: [],
        loading: true
    };
  }

  //Axios already JSON
    componentDidMount() {
      this.performSearch();

    }

    //fetch is a promis
  // componentDidMount() {
  //     fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
  //         .then(response => response.json())
  //         .then(responseData => {
  //             this.setState({gifs: responseData.data})
  //         })
  //         .catch(error => {console.log('Error fetching data', error)})
  // }

    performSearch = (query = 'hello') => {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
            .then(response => {
                this.setState({
                    gifs: response.data.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log('Error fetching data')
            })
    }

    render() {
      console.log(this.state.gifs)
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm
                onSearch={this.performSearch}
            />
          </div>   
        </div>    
        <div className="main-content">
            {
                (this.state.loading) ? <p>loading...</p> : <GifList
                    data={this.state.gifs}/>
            }

        </div>
      </div>
    );
  }
}
