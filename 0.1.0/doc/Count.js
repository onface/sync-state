var React = require('react')
class Count extends React.Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        return (
            <button className="countButton" onClick={function () {
                    self.props.onMount(
                        self.props.count + 1
                    )
                }} >
                {self.props.count}
            </button>
        )
    }
}
module.exports = Count
