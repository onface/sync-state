import React , { Component } from "react"
class RandomArray extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        return (
            <button onClick={function () {
                self.props.onChange(
                    [
                        Math.random(),
                        Math.random(),
                    ]
                )
            }} >
                {JSON.stringify(this.props.value)}
            </button>
        )
    }
}
module.exports = RandomArray
