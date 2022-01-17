function resolve(uri, action) {
  if(net.isIp(uri.host))
    return action([{protocol: uri.params.transport || 'UDP', address: uri.host, port: uri.port || 5060}]);

  function resolve46(host, cb) {
    dns.resolve4(host, function(e4, a4) {
      dns.resolve6(host, function(e6, a6) {
        if((a4 || a6).length)
          cb(null, a4.concat(a6));
        else
          cb(e4 || e6, []);
      });
    });
  }

  if(uri.port) {
    var protocols = uri.params.protocol ? [uri.params.protocol] : ['UDP', 'TCP'];
    
    resolve46(uri.host, function(err, address4) {
      address = (address || []).map(function(x) { return protocols.map(function(p) { return { protocol: p, address: x, port: uri.port || 5060};});})
        .reduce(function(arr,v) { return arr.concat(v); }, []);
        action(address);
    });
  }
  else {
    var protocols = uri.params.protocol ? [uri.params.protocol] : ['tcp', 'udp'];
  
    var n = protocols.length;
    var addresses = [];

    protocols.forEach(function(proto) {
      dns.resolveSrv('_sip._'+proto+'.'+uri.host, function(e, r) {
        --n;
        if(Array.isArray(r)) {
          n += r.length;
          r.forEach(function(srv) {
            resolve46(srv.name, function(e, r) {
              addresses = addresses.concat((r||[]).map(function(a) { return {protocol: proto, address: a, port: srv.port};}));
            
              if((--n)===0) // all outstanding requests has completed
                action(addresses);
            });
          });
        }
        else if(0 === n) {
          // all srv requests failed
          resolve46(uri.host, function(err, address) {
            address = (address || []).map(function(x) { return protocols.map(function(p) { return { protocol: p, address: x, port: uri.port || 5060};});})
              .reduce(function(arr,v) { return arr.concat(v); }, []);
            action(address);
          });
        }
      })
    });
  }
}