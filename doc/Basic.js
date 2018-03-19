var React = require('react')
var jsonFormat  = require('json-format')
var syncState = require('sync-state')
var Count = require('./Count')
var Range = require('./Range')
var RandomArray = require('./RandomArray')
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: 'abc'
            }
        }
    }
    render () {
        var self = this
        var sync = syncState(this, 'form')
        return (
            <div>
                <pre>{jsonFormat(this.state)}</pre>
                <h2>简单</h2>
                <input type="text" {...sync('name')}  />
                <input type="text" {...sync('user.title')}  />
                <h2>数组</h2>
                <RandomArray {...sync('random')} />
                <h2>别名 & defaultValue</h2>
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
               <h2>复杂别名</h2>
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
