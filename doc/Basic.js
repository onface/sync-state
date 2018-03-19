var React = require('react')
var syncState = require('sync-state')
var Count = require('./Count')
var Range = require('./Range')
var RandomArray = require('./RandomArray')
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'abc'
        }
    }
    render () {
        var self = this
        var sync = syncState(this)
        return (
            <div>
                <pre>{JSON.stringify(this.state)}</pre>
                simple:
                <input type="text" {...sync('name')}  />
                <input type="text" {...sync('user.title')}  />
                <hr />
                <RandomArray {...sync('random')} />
                <hr />
                alias: value change
                {/*
                   <Count count={1} onMount={function(count){...}} />
                */}
               <Count
                   {
                       ...sync('age', {
                           defaultValue: 10,
                           props: 'count',
                           change: 'onMount'
                       })
                   }
               />
               <hr />
               alias: value
               {/*
                   <Range start={1} end={2} onChange={fucntion (start, end) {}} />
                */}
               <Range
                    {
                        ...sync('range', {
                            defaultValue: [1, 4],
                            props: function (value) {
                                return {
                                    start: value[0],
                                    end: value[1]
                                }
                            },
                            sync: function (start, end) {
                                return [start, end]
                            }
                        })
                    }
               />
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
