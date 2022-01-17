function (Subscription) { 'use strict';
    
    function SignalTree (listeners) {
        // Using discriptor to prevent non-subTopic properties from being enumerable
        Object.defineProperties(this, {
            _listeners : {
                value : listeners && Object.prototype.toString.call(listeners) === '[object Array]' ? listeners : [],
                writable : true
            }
        })
    }

    // _Method_ __invokeList__ 
    // 
    // +   __array__ `topics` should be an array of listener arrays from the topics objects you wish to invoke. `this.branchingCollect(e.types, this._base)` or `this.collect(e.types)` can be used to enumerate the value out
    // +   __*__ `data` whatever you want passed to each of the subscribers
    // 
    // _returns_ `Boolean`
    function invokeList (topics, data) {
        var len = topics.length, i, listeners
        while ( len-- ) {
            listeners = topics[len]
            i = listeners.length
            if ( i > 0 ) {
                do {
                    // Returning false from a handler will prevent any further subscriptions from being notified
                    if ( listeners[--i].trigger(data) === false ) {
                        return false
                    }
                } while ( i )
            }
        }
        return true
    }
    function insertListener (node, subscriptionData) {
        var listeners = node._listeners.slice(),
            priority = subscriptionData.priority,
            added = false
        
        for ( var i = 0, len = listeners.length; i < len; i++ ) {
            if ( listeners[i].priority >= priority ) {
                listeners.splice(i, 0, subscriptionData)
                added = true
                break
            }
        }
        if ( !added )
            listeners.push(subscriptionData)
        
        node._listeners = listeners
    }
    function removeListener (node, callback) {
        var check
        switch ( typeof callback ) {
            case 'function':
                check = function (listenerData) {
                    return listenerData.callback !== callback
                }
                break
            case 'string':
                check = function (listenerData) {
                    return listenerData.callback.name !== callback
                }
                break
            case 'object':
                check = function (listenerData) {
                    return listenerData !== callback
                }
                break
            default:
                // if the user didn't pass a callback, all listeners will be removed
                check = function () {
                    return false
                }
        }
        node._listeners = node._listeners.filter(check)
    }
    // Recursive collect with the ability to fork and combine
    function branchingCollect (node, directive) {
        var i = 0,
            len = directive.length,
            direction,
            key,
            result = [node._listeners]
        while ( i < len ) {
            direction = directive[i++]
            key = direction[0]
            if ( key in node ) {
                result = result.concat(branchingCollect(direction.slice(1), node[key]))
            }
        }
        return result
    }
    // Takes an list of directions to follow and collects all listeners along the way
    function collect (node, directions) {
        var result = [node._listeners],
            len = directions.length,
            i = 0
        while ( i < len ) {
            node = node[directions[i++]]
            if ( node )
                result.push(node._listeners)
            else
                break
        }
        return result
    }

    SignalTree.prototype = {
        // Retieves a a sub-topic from the descending tree
        get : function (directions, useforce) {
            if ( ! directions )
                return this
            directions = directions.split('.')
            var topic = this,
                edge,
                len = directions.length,
                i = 0
            
            if ( len ) {
                do {
                    edge = directions[i++]
                    if ( topic[edge] instanceof SignalTree )
                        topic = topic[edge]
                    else if ( topic[edge] )
                        throw 'namespace clash: '+edge
                    else if ( useforce )
                        topic = topic[edge] = new SignalTree
                    else
                        break
                } while ( i < len )
            }
            return topic
        },
        
        // Triggers the listeners of just this topic
        invoke : function (data) {
            var listeners = this._listeners,
                len = listeners.length
            // [Optimized loop](http://jsperf.com/while-vs-if/2 "If guarded do while")
            if ( len > 0 ) {
                // ...and trigger each subscription, from highest to lowest priority
                do {
                    // Returning false from a handler will prevent any further subscriptions from being notified
                    if (listeners[--len].trigger(data) === false) {
                        return false
                    }
                } while ( len )
            }
            // If we made it this far it means no subscriptions were canceled. We return `true` to let the user know
            return true
        },

        // _Method_ __publish__  
        // If any callback returns false we immediately exit otherwise we simply return true to indicate that all callbacks were fired without interference
        // 
        //   +   __String__ `topic` the event type
        //   +   __...?__ `data` any data you want passed to the callbacks  
        //   
        // _returns_ `boolean` 
        publish : function (topic, data) {
            if ( typeof topic === 'string' ) {
                // [Split test](http://jsperf.com/global-string-splitting-match-vs-regexp-vs-split)  
                topic = collect(this, topic.split('.'))
            } else {
                data = topic
                topic = this._listeners
            }
            return invokeList(topic, data)
        },

        //  _Method_ __on__
        //  
        //  +   _optional_ __string__ `topics` a ' ' separate list of topics In the format `lvl1.lvl2.lvl3.etc`
        //  +   _optional_ __object__ `context`
        //  +   __function__ `callback` the function to handle events. Should take one argument, `data`
        //  +   _optional_ __number__ `priority` 1 will trigger before 2 etc  
        //  
        // returns `listenerObject`
        on : function (topics, context, callback, priority) {
            switch ( arguments.length ) {  
                case 3:
                    if (typeof callback === 'number') {
                        priority = callback
                        callback = context
                        context = window
                    } else
                        priority = 0
                    break
                case 2:
                    callback = context
                    context = window
                    priority = 0
                    break
                case 1:
                    callback = topics
                    topics = ''
                    context = window
                    priority = 0
                    break
                case 0:
                    throw 'Insufficient arguments'
            }

            var listenerData = new Subscription(context, callback, priority)

            // Multiple subscriptions can be set at the same time, in fact it is recommended as they end up sharing memory this way. No need to throw error for incorrect topic since accessing `split` on a non-string will throw an error anyway
            topics.split(' ').forEach(
                function (directions) {
                    insertListener(this.get(directions, true), listenerData)
                },
                this
            )
            return listenerData
        },

        // Same api as on except as soon as one topic is triggered the listener will be removed from __all__ topics it was subscribed to in the `once` call
        once : function (topics, context, callback, priority) {
            switch ( arguments.length ) {  
                case 3:
                    if (typeof callback === 'number') {
                        priority = callback
                        callback = context
                        context = window
                    } else
                        priority = 0
                    break
                case 2:
                    callback = context
                    context = window
                    priority = 0
                    break
                case 1:
                    callback = topics
                    topics = ''
                    context = window
                    priority = 0
                    break
                case 0:
                    throw 'Insufficient arguments'
            }
            var listenerData = new Subscription(context, callback, priority)
            listenerData._topics = []
            listenerData.trigger = function (data) {
                this._topics.forEach(function (topic) {
                    removeListener(topic, this)
                })
                return this.callback.call(this.context, data)
            }
            // I chose to use two subscriptions here instead of one as this way allows me to place the same subscriptions in each topic If I had used a closure I wouldn't of been able to return one true subscription object representing the function the user asked to subscribe
            topics.split(' ').forEach(
                function (directions) {
                    var topicObject = this.get(directions, true)
                    listenerData._topics.push(topicObject)
                    insertListener(topicObject, listenerData)
                },
                this
            )

            return listenerData
        },

        //  _Method_ __off__
        //  
        //  +   __String__ `topic` the event type  
        //  +   _optional_ __function|subscriptionRef|string__ `callback`  
        //    + If you do not pass a callback then all subscriptions will be removed from that topic
        //    + If you pass a string then all subscriptions with a callback name matching that string will be remove
        //    + If you pass a function then all subscriptions with that function will be removed
        off : function (topics, callback) {
            if (typeof topics !== 'string') {
                if ( !callback )
                    removeListener(this, topics) // `topics` in this case being the `callback`
                else 
                    throw 'no topic specified'
            }
                    
            topics.split(' ').forEach(
                function (topic) {
                    topic = this.get(topic, false)
                    if ( topic )
                        removeListener(topic, callback)
                },
                this
            )
        }
    }

    SignalTree.methods = function (target) {
        Object.keys(SignalTree.prototype).forEach(function (key) {
            if ( !target.hasOwnProperty(key) ) {
                Object.defineProperty(target, key, { 
                    value: SignalTree.prototype[key], 
                    writable:true,
                    configurable:true 
                })
            }
        })
        return target
    }
    SignalTree.mixin = function (target) {
        SignalTree.call(target)
        SignalTree.methods(target)
        return target
    }
    SignalTree.invokeList = invokeList
    SignalTree.insertListener = insertListener
    SignalTree.removeListener = removeListener
    SignalTree.collect = collect
    SignalTree.branchingCollect = branchingCollect

    // Use property definer so it is enumerbale 
    Object.defineProperty(SignalTree.prototype, 'constructor', { value: SignalTree })

    return new SignalTree
}