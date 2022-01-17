function(panel,index,ifo){
              saveDataTaskTemporal(ifo);
              panel.command(panel.loader.show);
              var r = new this.parent.module.rpc.xmlhttp({
                url:this.options.dataServer,
                args:"action=editTaskProperties&data="+{uid:data.uid,iForm:ifo,index:index}.toJSONString()
              });
              r.callback=this.parent.closure({instance:this,method:function(index,rpc,panel){
                panel.command(panel.loader.hide);
                panel.clearContent();
                var scs=rpc.xmlhttp.responseText.extractScript(); //capturamos los scripts
                panel.addContent(rpc.xmlhttp.responseText.stripScript());//Eliminamos porque ya no los necesitamos
                scs.evalScript(); //interpretamos los scripts
              },args:[index,r,panel]});
              r.make();
            }