function(s,cb) {
  debug('init socket')
  var self = this
  this.sockets.push(s)
  var subs = {}
  var subsListners = {}
  function sub(x) {
    x = x || '**'
    debug('subscribing',x)
    if (!subs[x]) {
      subs[x] = function(d) {
        var args = [].slice.call(arguments)
        var split = this.event.split(' ')
        if (split[0] == 'keys')
          args[args.length-2] = args[args.length-2].source
        var event = [self.namespace,'event'].concat(split)
        if (!s.socket.writable) return unsub()
        s.send(event,{args:args})
      }
      self.on(x,subs[x])
    }
  }
  function unsub(x) {
    Object.keys(subs).forEach(function(y){
      if (x && x!=y) return
      debug('unsubscribing',y)
      self.removeListener(y,subs[y])
      delete subs[y]
    })
  }
  s.on('error',function(err){
    console.log('err',err)
  })
  s.on('close',function(){
    unsub()
    s.destroy()
    self.sockets.splice(self.sockets.indexOf(s),1)
  })
  s.data(self.namespace+'::**',function(d){
    d = d || {}
    var args = d.args || []
    var method = this.event[2] == 'method' ? this.event[3] : null
    var event  = this.event[2] == 'event'  ? this.event[3] : null
    if (method) debug('data-method',method,args)
    if (event) debug('data-event',event,args)
    if (method) {
      switch (method) {
        case 'onAny':
          sub('**')
          break
        case 'on':
        case 'subscribe':
          args[0] = args[0].split('::').join(' ')
          sub(args[0])
          break
        case 'once':
          args[0] = args[0].split('::').join(' ')
          self.once(args[0],function(){
            var args = [].slice.call(arguments)
            var split = this.event.split(' ')
            // if (split[0] == 'keys') args[args.length-2] = args[args.length-2].source
            var event = [self.namespace,'event'].concat(split)
            s.send(event,{args:args})
          })
          break
        case 'offAny':
          unsub('**')
          break
        case 'removeListener':
        case 'off':
        case 'unsubscribe':
          args[0] = args[0].split('::').join(' ')
          unsub(args[0])
          break
        case 'keys':
          var regex
          try {
            regex = (new RegExp(args[0]))
          } catch (e) {
            console.error(e)
          }
          self.keys(regex)
          break
        default:
          if (ev.prototype[method] && typeof ev.prototype[method] == 'function')
            self[method].apply(self,args)
          else
            console.log('unknown method',method)
      }
    }
  })
  var r = {}
  // console.log(Object.keys(ev.prototype))
  ;[ 'die', 'del', 'exists', 'expire', 'expireat', /*'keys', 'move', 'object'*/
   , 'persist', 'randomkey', 'rename', 'renamenx', /*'sort', 'type'*/, 'ttl'
   , 'append', 'decr', 'decrby', 'get'/*, 'getbit'*/, 'getrange', 'getset', 'incr'
   , 'incrby', 'mget', 'mset', 'msetnx', 'set'/*, 'setbit', 'setex'*/, 'setnx'
   , 'setrange', 'strlen', 'hdel', 'hexists', 'hget', 'hgetall', 'hincr'
   , 'hincrby', 'hdecr', 'hdecrby', 'hkeys', 'hlen', 'hmget' , 'hmset', 'hset'
   , 'hsetnx', 'hvals', 'lindex', 'linsert', 'llen', 'lpop', 'lpush', 'lpushx'
   , 'lrange', 'lrem', 'lset', 'ltrim', 'rpop', 'rpoplpush', 'rpush', 'rpushx'
   , 'dump', 'swap', 'findin'
   ].forEach(function(m){
    r[m] = function(){
      var args = [].slice.call(arguments)
      var cb = typeof args[args.length-1] == 'function'
               ? args.pop() : null
      // s.send([self.namespace,'method',m].concat(args),cb)
      s.send([self.namespace,'method',m],{args:args},cb)
    }
  })
  r.keys = function(){
    var args = [].slice.call(arguments)
    if (args[0] instanceof RegExp) args[0] = args[0].source
    s.send([self.namespace,'method','keys'],{args:args})
  }
  r.on = r.subscribe = function(event,cb,_cb){
    event = event.split(' ').join('::')
    s.data(self.namespace+'::event::'+event,function(d){
      this.event = this.event.slice(3).join(' ') // not sure about that
      cb.apply(this,d.args)
    })
    s.send([self.namespace,'method','on'],{args:[event]},_cb)
  }
  r.once = function(event,cb,_cb){
    event = event.split(' ').join('::')
    s.dataOnce(self.namespace+'::event::'+event,function(d){
      this.event = this.event.slice(3).join(' ') // not sure about that
      cb.apply(this,d.args)
    })
    s.send([self.namespace,'method','once'],{args:[event]},_cb)
  }
  r.onAny = function(cb,_cb){
    s.data(self.namespace+'::event::**',function(d){
      this.event = this.event.slice(3).join(' ') // not sure about that
      cb.apply(this,d.args)
    })
    s.send([self.namespace,'method','onAny'],{args:[]},_cb)
  }
  r.off = r.unsubscribe = function(event,_cb){
    event = event.split(' ').join('::')
    debug('sending','unsubscribe',event)
    s.send([self.namespace,'method','unsubscribe'],{args:[event]},_cb)
  }
  r.offAny = function(_cb){
    s.send([self.namespace,'method','offAny'],{args:[]},_cb)
  }
  this.emit('remote',r,s)
  cb && cb(r,s)
}