function () { 'use strict';
    
    // The constructor can be used both to create new subjects and to turn arbitrary objects into observables
    function Observer (targetObject, prototype) {
        var self = this
        if ( ! (this instanceof Observer) ) {
            if ( targetObject ) {
                self = targetObject
                Object.keys(Observer.prototype).forEach(function (key) {
                    Object.defineProperty(prototype || self, key, { value: Observer.prototype[key] })
                })
            } else
                return new Observer
        }
        return Object.defineProperty(self, '_base', { value: new Topic })
    }

    function forciblyFind ( directions, topic ) {
        for ( var location = 0, destination = directions.length, next; location < destination; location++ ) {
            next = directions[location]
            if ( location === 0 && next === '' )
                break
            topic = topic.hasOwnProperty(next) ? topic[next] : topic.createSubTopic(directions[location], directions.slice(0, location + 1).join('.'))
        }
        return topic
    }

    Observer.prototype = {

        // _Method_ __publish__ `boolean` If any callback returns false we immediately exit otherwise we simply return true to indicate
        // that all callbacks were fired without interference
        // 
        //   +   __String__ `topic` the event type
        //   +   __...?__ `data` any data you want passed to the callbacks  
        publish : function (topic, data) {
            var topicNode = this._base[topic],
                listeners, len

            if ( !topicNode ) {
                
                topicNode = this._base
                topic = topic.split('.')
                len = 0
                
                while ( len < topic.length ) {
                    if ( !topicNode.hasOwnProperty(topic[len]) )
                        break
                    topicNode = topicNode[topic[len++]]
                }
            }

            do {
                
                listeners = topicNode._listeners,
                len = listeners.length - 1
                
                // [Performance test](http://jsperf.com/while-vs-if "loop setup cost")
                if ( len >= 0 ) {
                    // ...and trigger each subscription, from highest to lowest priority
                    do {
                        // Returning false from a handler will prevent any further subscriptions from being notified
                        if ( (topic = listeners[len]).callback.call(topic.context, data) === false ) {
                            return false
                        }
                    } while ( len-- )
                }
                
            } while ( (topicNode = topicNode._parent) !== undefined )

            return true
        },

        // _Method_ __run__ A quicker version of publish designed to trigger just the specified event i.e. no bubbling
        //   
        //   +   __String__ `topic` the event type
        //   +   __...?__ `data` any data you want passed to the callbacks
        run : function ( topic, data ) {
            var len
            // By getting the sub reference immediately we don't need to worry about subscriptions 
            // changing since both subscribe and unsubscribe copy the listener array rather than augment it
            if (topic = this._base[topic]) {
                topic = topic._listeners
                len = topic.length - 1
                if (len !== -1) {
                    do {
                        if (topic[len].trigger(data) === false) {
                            return false
                        }
                    } while ( len-- )
                }
                return true
            }
            // If no topic exists `undefined` is returned
        },

        //  _Method_ __on__ `listenerObject`
        //  
        //  +   _optional_ __string__ `topics` a ' ' separate list of topics In the format `lvl1.lvl2.lvl3.etc`
        //  +   _optional_ __object__ `context`
        //  +   __function__ `callback` the function to handle events. Should take one argument, `data`
        //  +   _optional_ __number__ `priority` 1 will trigger before 2 etc  
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

            // Multiple subscriptions can be set at the same time, in fact it is recommended as they end up sharing memory this way
            // No need to throw error for incorrect topic since accessing `split` on a non-string will throw an error anyway
            topics.split(' ').forEach(
                function (directions) {
                    forciblyFind(directions.split('.'), this).insertListener(listenerData)
                },
                this._base
            )

            // since the object which ultimately gets subscribed is returned you can catch it in a variable and use that later to unsubscribe in a more specific fashion than
            // would otherwise be if unsubscribing by callback, which removes all matching callbacks on the given topic. Returning the subscribed objects is also a plus 
            // for plug-in developers who can augment a subscriptions behavior after the fact
            return listenerData
        },
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

            topics.split(' ').forEach(
                function (directions) {
                    var topicObject = forciblyFind(directions.split('.'), this)
                    var remover = new Subscription(
                        window,
                        function () {
                            topicObject._listeners = topicObject._listeners.filter(
                                function (subscription) {
                                    return subscription !== remover && subscription !== listenerData
                                }
                            )
                        },
                        listenerData.priority
                    )
                    topicObject.insertListener(listenerData)
                    topicObject.insertListener(remover)
                },
                this._base
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
            if (typeof topics !== 'string')
                if ( !callback )
                    this._base.removeListener(topics)
                else 
                    throw 'no topic specified'
                    
            topics.split(' ').forEach(
                function (topic) {
                    this[topic] && this[topic].removeListener(callback)
                },
                this._base
            )
        },
        constructor : Observer
    }
    Object.defineProperty(Observer.prototype, 'constructor', { enumerable: false })
    
    
    function Subscription (context, callback, priority) {
        if ( typeof callback !== 'function' || typeof priority !== 'number' )
            throw 'Incorrect argument format'
        this.context = context
        this.callback = callback
        this.priority = priority
    }

    // All new subscriptions are returned to the user from the subscribe function. Therefore, the subscription prototype is a good place to add smarts
    Subscription.prototype = {
        trigger : function (data) {
            // [Call is faster than apply](http://jsperf.com/apply-vs-call-vs-invoke/9 "jsperf apply vs call vs invoke")
            return this.callback.call(this.context, data)
        }
        // TODO: add an unsubscribe method
    }
    
    
    function Topic ( parentNode ) {
        this._listeners = []
        this._parent = parentNode
    }

    Topic.prototype = {

        createSubTopic : function (subName, fullAddress) {
            this[subName] = new Topic(this)
            var topicObject = this
            while ( topicObject._parent ) {
                topicObject = topicObject._parent
            }
            // Create top level mapping
            return topicObject[fullAddress] = this[subName]
        },

        insertListener : function ( subscriptionData ) {
            var listeners = this._listeners.slice(),
                len = listeners.length,
                priority = subscriptionData.priority,
                i = 0,
                added = false
            
            for ( ; i < len; i++ ) {
                if ( listeners[i].priority >= priority ) {
                    listeners.splice( i , 0, subscriptionData )
                    added = true
                    break
                }
            }

            if ( !added )
                listeners.push(subscriptionData)

            // Because the topic now references a new object any publication processes will not be affected
            this._listeners = listeners
        },

        removeListener : function (callback) {
            var check

            switch (typeof callback) {
            case 'function':
                check = function (listenerData) {
                    return listenerData.callback !== callback
                }
                break;
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

            this._listeners = this._listeners.filter(check)
        },

        invokeListeners : function (data) {
            var listeners = this._listeners,
                len = listeners.length - 1
            // [Performance test](http://jsperf.com/while-vs-if "loop setup cost")
            if (len !== -1) {
                // ...and trigger each subscription, from highest to lowest priority
                do {
                    // Returning false from a handler will prevent any further subscriptions from being notified
                    if (listeners[len].trigger(data) === false) {
                        return false
                    }
                } while (len--)
            }

            // If we made it this far it means no subscriptions canceled propagation. So we return true to let the user know
            return true
        }
    }

    // Create aliases
    Observer.prototype.unsubscribe = Observer.prototype.off
    Observer.prototype.subscribe = Observer.prototype.on

    // Make supporting constructors available on Subject so as to allow extension developers to subclass them
    Observer.Subscription = Subscription

    return Observer
}