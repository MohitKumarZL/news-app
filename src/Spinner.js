import React, { Component } from 'react'
import loder from './Components/loder.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className="my-3 text-center">
        <img src={loder} alt="Loding" />
      </div>
    )
  }
}

export default Spinner