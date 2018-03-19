var extend = require('extend')
function modifState (state, attrArray, value) {
    var data = []
    attrArray.reverse().forEach(function (key, index) {
        if (index === 0) {
            data.push({
                [key]: value
            })
        }
        else {
            data.push({
                [key]: data[data.length-1]
            })
        }
    })
    return data[data.length-1]
}
function syncState (self) {
    return function () {
        return sync.apply(undefined, [self].concat(Array.from(arguments)))
    }
}
function sync(app, attrs, settings) {
    let defaultSettings = {
        props: 'value',
        change: 'onChange'
    }
    settings = extend(true, {}, defaultSettings, settings)
    let props = {}
    let value = app.state
    var attrArray = attrs.split('.')
    attrArray.forEach(function (key, index) {
        value = value[key] || {}
    })
    if (JSON.stringify(value) === '{}') {
        if (settings.defaultValue) {
            value = settings.defaultValue
            // 延迟执行，避免组件没有渲染出来
            setTimeout(function () {
                app.setState(modifState(app.start, attrArray, value))
            }, 0)
        }
        else {
            value = ''
        }

    }
    let sync
    switch (typeof settings.props) {
        case 'string':
            props[settings.props] = value
        break
        case 'function':
            props = extend(true, {}, props, settings.props(value))
        break
        default:
            throw new Error('node_modules/sync-state: `sync(app, attrs, settings)` settings.props must be a string or a function')
    }
    switch (typeof settings.sync) {
        case 'undefined':
            sync = function (e) {
                if (typeof e.target !== 'undefined') {
                    return e.target.value
                }
                else {
                    return e
                }
            }
        break
        case 'function':
            sync = settings.sync
        break
        default:
            throw new Error('node_modules/sync-state: `sync(app, attrs, settings)` settings.sync must be a function')
    }
    props[settings.change] = function () {
        let value = sync.apply(undefined, arguments)
        app.setState(modifState(app.state, attrArray, value))
    }
    return props
}
module.exports = syncState
