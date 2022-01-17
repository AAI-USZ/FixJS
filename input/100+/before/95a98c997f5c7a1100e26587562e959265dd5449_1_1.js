function (Topic, Subscription) { 'use strict';
    
    function SignalTree () {
        return Object.defineProperties(this, {
            _base : {
                value : new Topic(),
                writable : true
            }
        })
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

    SignalTree.prototype = {
        // Retieves a topic node from the tree
        get : function (directions, useforce) {
            if ( ! directions )
                return this._base
            directions = directions.split('.')
            var topic = this._base,
                edge,
                len = directions.length,
                i = 0
            
            if ( len ) {
                do {
                    edge = directions[i++]
                    if ( topic[edge] instanceof Topic )
                        topic = topic[edge]
                    else
                        if ( useforce )
                            topic = topic[edge] = new Topic
                        else
                            break
                } while ( i < len )
            }
            return topic
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
                topic = SignalTree.prototype.collect.call(this, topic.split('.'))
            } else {
                data = topic
                topic = this._base._listeners
            }
            return SignalTree.prototype._emit.call(this, topic, data)
        },

        // _Method_ ___emit__ 
        // 
        // +   __array__ `topics` should be an array of listener arrays from the topics objects you wish to invoke. `this.branchingCollect(e.types, this._base)` or `this.collect(e.types)` can be used to enumerate the value out
        // +   __*__ `data` whatever you want passed to each of the subscribers
        // 
        // _returns_ `Boolean`
        _emit : function (topics, data) {
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
                    this.get(directions, true).add(listenerData)
                },
                this
            )

            // since the object which ultimately gets subscribed is returned you can catch it in a variable and use that later to unsubscribe in a more specific fashion than would otherwise be if unsubscribing by callback, which removes all matching callbacks on the given topic. Returning the subscribed objects is also a plus for plug-in developers who can augment a subscriptions behavior after the fact
            return listenerData
        },
        // Same api as on except as soon as one topic is triggered the listener will be removed from __all__ topics its topics
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
                    topic.remove(this)
                })
                return this.callback.call(this.context, data)
            }
            // I chose to use two subscriptions here instead of one as this way allows me to place the same subscriptions in each topic If I had used a closure I wouldn't of been able to return one true subscription object representing the function the user asked to subscribe
            topics.split(' ').forEach(
                function (directions) {
                    var topicObject = this.get(directions, true)
                    listenerData._topics.push(topicObject)
                    topicObject.add(listenerData)
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
                    this._base.removeListener(topics)
                else 
                    throw 'no topic specified'
            }
                    
            topics.split(' ').forEach(
                function (topic) {
                    topic = this.get(topic, false)
                    if ( topic )
                        topic.remove(callback)
                },
                this
            )
        },
        // Recursive collect with the ability to fork and combine
        branchingCollect : function collect (directive, start) {
            var i = 0,
                len = directive.length,
                direction,
                key,
                result = [start._listeners]
            while ( i < len ) {
                direction = directive[i++]
                key = direction[0]
                if ( key in start ) {
                    result = result.concat(collect(direction.slice(1), start[key]))
                }
            }
            return result
        },
        // Takes an list of directions to follow and collects all listeners along the way
        collect : function (directions) {
            var node = this._base,
                result = [node._listeners],
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
    }
    // Use property definer so it is enumerbale 
    Object.defineProperty(SignalTree.prototype, 'constructor', { value: SignalTree })

    return SignalTree.mixin(SignalTree)
}