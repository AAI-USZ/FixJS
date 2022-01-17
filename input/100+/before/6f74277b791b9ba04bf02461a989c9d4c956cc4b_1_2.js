function() {
    var fs = require('fs');
    var path = require('path');
    var spawn = require('child_process').spawn;
    var httpProxy = require('http-proxy');

    var meteors = ['root'];
    _.each(fs.readdirSync(process.cwd()),function(p) {
      if (p !== 'root' && p[0] !== '.' && 
          path.existsSync(path.join(p,'.meteor'))) {
        meteors.push(p);
      }
    })

    _.each(meteors,function(app,idx) {
      var p = spawn('mymeteor',['--port',3000+4*idx+1],{cwd: app, env: process.env});
      p.stdout.on('data',function(data) {
        console.log(app+': '+data);
      });
      p.stderr.on('data',function(data) {
        console.error(app+': '+data);
      });
    });

    var express = require('express');
    var p = httpProxy.createServer(function(req,res,proxy) {
      _.each(meteors,function(app,idx) {
        if (app == 'root') return;
        console.log([req.url]);
        console.log(req.url.indexOf('/'+app+'/'));
        if (req.url.indexOf('/'+app) == 0) {
          req.url.slice(app.length+1);
          proxy.proxyRequest(req,res,{
            host: '127.0.0.1', port: 3000+4*idx+1
          });
          return;
        }
      });
      proxy.proxyRequest(req,res,{
        host: '127.0.0.1', port: 3001
      });
    });
    p.on('upgrade', function(req, socket, head) {
      _.each(meteors,function(app,idx) {
        if (app == 'root') return;
        if (req.url.indexOf('/'+app) == 0) {
          req.url.slice(app.length+1);
          p.proxy.proxyWebSocketRequest(req,socket,head,{
            host: '127.0.0.1', port: 3000+4*idx+1
          });
          return;
        }
      });
      p.proxy.proxyWebSocketRequest(req, socket, head, {
        host: '127.0.0.1', port: 3001
      });
    });
    p.listen(3000,function(){});

  }