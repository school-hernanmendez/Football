import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar.js'

class Measures extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: props.height,
            weight: props.weight,
            workouts: props.workouts
        }
    }
    render() {
        return (
            <div class="wrap page">
                <Navbar />
                <p>Set your max</p>
                {
                    Object.keys(this.state.workouts).filter(i => {
                        return this.state.workouts[i].type != 'no'
                    }).map(i => {
                        return (
                            <div>
                                <p>{key.replace(/\_/g, ' ').replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())}</p>
                                <input type="input" value={this.state.value}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(state => state, { editW, editH, editW })(Measures)