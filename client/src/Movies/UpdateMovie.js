import React, { Component } from "react";
const axios = require("axios");
export default class UpdateMovie extends Component {
  state = {
    movie: {
      title: "",
      director: "",
      metascore: "",
      stars: []
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await axios(`http://localhost:5000/api/movies/${id}`);
    const movie = res.data;
    this.setState(prev => ({ ...prev, movie }));
  }
  handleChange = ({target:{name,value}})=>{
      this.setState(prev => ({...prev,movie:{...prev.movie,[name]:value}}))
  }
  handleSubmit = async e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    try{
        await axios.put(`http://localhost:5000/api/movies/${id}`,{...this.state.movie})
        this.props.history.push(`/movies/${id}`);
    }catch(er){
        console.log(er)
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.movie.title}
          required
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="director"
          value={this.state.movie.director}
          required
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="metascore"
          min='0'
          max='100'
          value={this.state.movie.metascore}
          required
          onChange={this.handleChange}
        />
        <input type='submit' value='Enter'/>
      </form>
    );
  }
}
