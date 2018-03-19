var React = require('react')
class Range extends React.Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        return (
            <div>
                <select className="rangeStart" value={self.props.start} onChange={function (e) {
                        self.props.onChange(parseInt(e.target.value), parseInt(self.props.end))
                    }} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select className="rangeEnd" value={self.props.end} onChange={function (e) {
                        self.props.onChange(parseInt(self.props.start), parseInt(e.target.value))
                    }} >
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        )
    }
}
module.exports = Range
