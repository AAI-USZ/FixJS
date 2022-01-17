function(){

      /*{{{ beforeEach */
      beforeEach(function(done){
         
        var count = 4;
        var seq = 0;

        function cb(err){
          if(--count === 0){
            done();
          }
        }

        var infos = [
          {
            name : serviceNode,
            version : '1.0',
            addr : 'http://127.0.0.1:9111',
            meta : {room:'CM4'},
            callback:cb
          },
          {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9112',
            meta : {room:'CM3'},
            callback:cb
          },
          {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9113',
            meta : {room:'CM4'},
            callback:cb
          },
          {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9114',
            meta : {room:'CM4'},
            callback:cb
          },
        ]; 

        infos.forEach(function(info){
          initNode(
            '/'+CONSTANTS.SERVICE_ROOT+'/'+serviceNode+'/'+info.version+'/'+(seq++),
            info.callback,
            JSON.stringify({addr:info.addr,meta:info.meta})
          );
        });
        
      });
      /*}}}*/

      /*{{{ afterEach */
      afterEach(function(done){
        
        var path = ['/1.0/0','/2.0/1','/2.0/2','/2.0/3'];
        var count = path.length;

        path.forEach(function(one){
          deleteNode('/'+CONSTANTS.SERVICE_ROOT+'/'+serviceNode+one,function(err){
            if(--count === 0){
              iShare.recover();
              setTimeout(function(){
                done();
              },2000);
            }
          });
        });
      });
      /*}}}*/

      /*{{{ test subscribe ok */
      it('test subscribe ok',function(done){
        var caseEmitter = new EventEmitter();

        //normal filter
        var serv = iShare.subscribe(serviceNode,'2.0',function(err){
          if(err){
            throw new Error(err);
          }
          serv.getServiceAll().length.should.eql(3);
          caseEmitter.emit('continue');
        });

        caseEmitter.on('continue',function(){
          var count = 7;
          //recent version
          var serv2 = iShare.subscribe(serviceNode,'0',function(err){
            if(err){
              throw new Error(err);
            }
            serv2.getServiceAll().length.should.eql(3);
            if(--count === 0){
              done();
            }
          });

          //filter is an object
          var serv3 = iShare.subscribe(serviceNode,{version:'1.0'},function(err){
            if(err){
              throw new Error(err);
            }
            serv3.getServiceAll().length.should.eql(1);
            if(--count === 0){
              done();
            }
          });

          //filter is an object and recent version
          var serv4 = iShare.subscribe(serviceNode,{version:'0'},function(err){
            if(err){
              throw new Error(err);
            }
            serv4.getServiceAll().length.should.eql(3);
            if(--count === 0){
              done();
            }
          });

          //filter is an object and set min
          var serv5 = iShare.subscribe(serviceNode,{version:{min:'2.0'}},function(err){
            if(err){
              throw new Error(err);
            }
            serv5.getServiceAll().length.should.eql(3);
            if(--count === 0){
              done();
            }
          });

          //filter is an object and set min and no such big version
          var serv6 = iShare.subscribe(serviceNode,{version:{min:'7.0'}},function(err){
            if(err){
              throw new Error(err);
            }
            serv6.getServiceAll().length.should.eql(0);
            if(--count === 0){
              done();
            }
          });

          //filter is an object and version is undefined and set room
          var serv7 = iShare.subscribe(serviceNode,{room:'CM4'},function(err){
            if(err){
              throw new Error(err);
            }
            serv7.getServiceAll().length.should.eql(2);
            if(--count === 0){
              done();
            }
          });

          //filter is wrong type
          var serv8 = iShare.subscribe(serviceNode,1,function(err){
            if(err){
              err.name.should.eql('FILTER_WRONG');
              if(--count === 0){
                done();
              }
            }
          });

        });

      });
      /*}}}*/

      /*{{{ test getServiceAny ok*/
      it('test getServiceAny ok',function(done){
        var serv = iShare.subscribe(serviceNode,'2.0',function(err){
          if(err){
            throw new Error(err);
          }
          var get1 = serv.getServiceAny();
          var get2 = serv.getServiceAny();
          get1.should.not.equal(get2);
          done();
        });
      });
      /*}}}*/

      /*{{{ test subscribe online and offline ok*/
      it('test subscribe online and offline ok',function(done){
        var regId;
        var step = 0;
        var serv = iShare.subscribe(serviceNode,'2.0',function(err){
          if(err){
            throw new Error(err);
          }
          var get = serv.getServiceAll();
          serv.on('update',function(nodes){
            if(step === 0){
              //online
              nodes.length.should.eql(get.length+1);
              iShare.unRegisterService(regId,function(err){
                if(err){
                  throw new Error(err);
                }
              });
              step++;
            }else if(step === 1){
              //offline
              nodes.length.should.eql(get.length);
              step++;
              done();
            }
          });

          var info = {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9115',
            callback : function(err){
              if(err){
                throw new Error(err);
              }
            }
          };

          regId = iShare.registerService(info.name,info.version,info.addr,info.meta,info.callback);
        });
      });
      /*}}}*/

      /*{{{ test default heartbeat ok */
      it('test default heartbeat ok',function(done){
        var regId;
        var server = http.createServer(function(req,res){
          res.end('ok');
        }).listen('9222',function(){
          var step = 0;
          var info = {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9222',
            callback : function(err){
              if(err){
                throw new Error(err);
              }

              var serv = iShare.subscribe(serviceNode,'2.0',function(err){
                if(err){
                  throw new Error(err);
                }
                serv.getServiceAll().length.should.eql(4);
                server.close();
              });

              serv.heartbeat('default',500);

              serv.on('update',function(nodes){
                if(step === 0){
                  nodes.length.should.eql(3);
                  step++;
                  server = http.createServer(function(req,res){
                    res.end('ok');
                  }).listen('9222');
                }else if(step === 1){
                  nodes.length.should.eql(4);
                  step++;
                  iShare.unRegisterService(regId,function(err){
                    server.close();
                    done();
                  });
                }
              });

            }
          };
          regId = iShare.registerService(info.name,info.version,info.addr,info.meta,info.callback);
        });

      });
      /*}}}*/

      /*{{{ test default heartbeat with wrong code ok */
      it('test default heartbeat with wrong code ok',function(done){
        var obj = {code:200};
        var regId;
        var server = http.createServer(function(req,res){
          res.end('ok');
        }).listen('9222',function(){
          var step = 0;
          var info = {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9222',
            callback : function(err){
              if(err){
                throw new Error(err);
              }

              var serv = iShare.subscribe(serviceNode,'2.0',function(err){
                if(err){
                  throw new Error(err);
                }
                serv.getServiceAll().length.should.eql(4);
                server.close();
              });

              serv.heartbeat('default',500);

              serv.on('update',function(nodes){
                if(step === 0){
                  nodes.length.should.eql(3);
                  step++;
                  server = http.createServer(function(req,res){
                    res.statusCode = obj.code;
                    res.end('ok');
                  }).listen('9222');
                }else if(step === 1){
                  nodes.length.should.eql(4);
                  step++;
                  obj.code = 400;
                }else if(step === 2){
                  nodes.length.should.eql(3);
                  step++;
                  iShare.unRegisterService(regId,function(err){
                    server.close();
                    done();
                  });
                }
              });

            }
          };
          regId = iShare.registerService(info.name,info.version,info.addr,info.meta,info.callback);
        });

      });
      /*}}}*/

      /*{{{ test heartbeat log function ok */
      it('test heartbeat log function ok',function(done){
        var ok = false;
        var saveContent = '';
        var info = {
          name : serviceNode,
          version : '2.0',
          addr : 'http://127.0.0.1:9222',
          callback : function(err){
            if(err){
              throw new Error(err);
            }

            var serv = iShare.subscribe(serviceNode,'2.0',function(err){
              if(err){
                throw new Error(err);
              }
              serv.getServiceAll().length.should.eql(4);
            });

            serv.heartbeat('default', 500, function(content){
              saveContent = content;
              fs.writeFileSync(__dirname + '/tmp/tmpHBLog', content);
            });

            serv.on('update',function(nodes){
              var get = fs.readFileSync(__dirname + '/tmp/tmpHBLog').toString();
              get.should.eql(saveContent);
              if(ok){return;}
              ok = true;
              done();
            });

          }
        };
        regId = iShare.registerService(info.name,info.version,info.addr,info.meta,info.callback);
      });
      /*}}}*/

      /*{{{ test heartbeat set ok */
      it('test heartbeat set ok',function(done){
        var regId;
        var server = http.createServer(function(req,res){
          res.end('ok');
        }).listen('9222',function(){
          var step = 0;
          var info = {
            name : serviceNode,
            version : '2.0',
            addr : 'http://127.0.0.1:9222',
            callback : function(err){
              if(err){
                throw new Error(err);
              }

              var serv = iShare.subscribe(serviceNode,'2.0',function(err){
                if(err){
                  throw new Error(err);
                }
                serv.getServiceAll().length.should.eql(4);
                server.close();
              });

              serv.heartbeat(function(addr,cb){
                exec('curl '+addr,function(err,stdout,stderr){
                  if(err){
                    cb('service is unavailable');
                  }else{
                    cb();
                  }
                });
              },500);

              serv.on('update',function(nodes){
                if(step === 0){
                  nodes.length.should.eql(3);
                  step++;
                  server = http.createServer(function(req,res){
                    res.end('ok');
                  }).listen('9222');
                }else if(step === 1){
                  nodes.length.should.eql(4);
                  step++;
                  iShare.unRegisterService(regId,function(err){
                    server.close();
                    done();
                  });
                }
              });

            }
          };
          regId = iShare.registerService(info.name,info.version,info.addr,info.meta,info.callback);
        });

      });
      /*}}}*/

      /*{{{ test write service cache ok*/
      it('test write service cache ok',function(done){
        try{
          var splits = testConf.cachepath.split('/');
          var prefix = splits.pop();
          var dir    = splits.join('/');
          var pattern = new RegExp('^'+prefix,'i');

          var get = fs.readdirSync(dir);
          for(var i = 0;i<get.length;i++){
            if(pattern.test(get[i])){
              fs.unlinkSync(dir+'/'+get[i]);
            }
          }
        }catch(e){}
        
        var serv = iShare.subscribe(serviceNode,'2.0',function(err){
          if(err){
            throw new Error(err);
          }
          serv.getServiceAll().length.should.eql(3);

          var get = JSON.parse(fs.readFileSync(testConf.cachepath + CONSTANTS.SEP + process.pid));
          var key = JSON.stringify({name:serviceNode,filter:'2.0'});
          get['service'][key].length.should.eql(3);
          done();
        });
      });
      /*}}}*/

      /*{{{ test read service cache and zk recover later ok */
      it('test read service cache and zk recover later ok',function(done){
        var step = 0;
        try{
          var splits = testConf.cachepath.split('/');
          var prefix = splits.pop();
          var dir    = splits.join('/');
          var pattern = new RegExp('^' + prefix + CONSTANTS.SEP, 'i');

          var get = fs.readdirSync(dir);
          for(var i = 0;i<get.length;i++){
            if(pattern.test(get[i])){
              fs.unlinkSync(dir+'/'+get[i]);
            }
          }
        }catch(e){}
        //write fake cache file
        var key = JSON.stringify({name:serviceNode,filter:'2.0'});
        var content1 = [{addr:'http://127.0.0.1:9115',meta:{}}];
        var cache1 = {'service':{},'app':{}};
        cache1['service'][key] = content1;
        fs.writeFileSync(testConf.cachepath+CONSTANTS.SEP+'1',JSON.stringify(cache1));

        var content2 = [{addr:'http://127.0.0.1:9116',meta:{}}];
        var cache2 = {'service':{},'app':{}};
        cache2['service'][key] = content2;
        fs.writeFileSync(testConf.cachepath+CONSTANTS.SEP+'2',JSON.stringify(cache2));

        var splits = testConf.zookeeper.split(':');
        splits.pop();
        splits.push('2188/');
        var fake = splits.join(':');
        //set useless config
        iShare.setConfig({
          zookeeper : fake,
          username : '',
          password : '',
          cachepath : testConf.cachepath
        });

        var serv = iShare.subscribe(serviceNode,'2.0',function(err){
          if(err){
            throw new Error(err);
          }
          //get cache content
          if(step !== 0){return;}
          serv.getServiceAll().length.should.eql(2);
          step++;
          //set back to normal config
          iShare.setConfig({
            zookeeper : testConf.zookeeper,
            username : '',
            password : '',
            cachepath : testConf.cachepath
          });
          done();
        });

      });
      /*}}}*/

      /*{{{ test get recent add new version ok*/
      it('test get recent add new version ok',function(done){
        var regId;
        var step = 0;
        var serv = iShare.subscribe(serviceNode,'0',function(err){
          if(err){
            throw new Error(err);
          }
          serv.getServiceAll().length.should.eql(3);

          serv.on('update',function(nodes){
            if(step === 1){return;}
            step++;
            nodes.length.should.eql(1);
            iShare.unRegisterService(regId,function(err){
              process.nextTick(function(){
                iShare.recover();
                deleteNode('/'+CONSTANTS.SERVICE_ROOT+'/'+serviceNode+'/6.0',function(err){
                  done();
                });
              });
            });
          });
          var info = {
            name : serviceNode,
            version : '6.0',
            addr : 'http://127.0.0.1:9115',
            callback : function(err){
              if(err){
                throw new Error(err);
              }
            }
          };
          regId = iShare.registerService(info.name,info.version,info.addr,info.meta,info.callback);
        });
      });
      /*}}}*/

    }