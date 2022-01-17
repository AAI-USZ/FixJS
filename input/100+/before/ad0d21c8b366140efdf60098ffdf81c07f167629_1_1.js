function(cfg, response, operation) {
        //todo: lazy dispear progress
        //todo: mask the action component
        //binder scope
        var app = this,
            c = cfg.container,
            dbc = cfg.dbc,
            pcfg = cfg.pcfg||{},
            ptype = pcfg[operation.action]||pcfg.type,
            domask = ptype != 'newin' && !pcfg.nomask && (!pcfg || !pcfg.noMask || cfg.maskid),
            pend = response?(!response.pending): true,
            title = response&&response.pending?response.pending.title:Ext.String.capitalize(operation.action+' '+cfg.modelId),
            msg = response&&response.pending?response.pending.msg:'Please waiting ...',    
            number = response&&response.pending?response.pending.number:(operation.seq/(operation.seqmax?operation.seqmax:10)),
            pendingtext = response&&response.pending?response.pending.text:title+' '+Ext.util.Format.number(number, '0.00')+'%',
            donetext = response&&response.msg?response.msg:title+' done.',
            pc = null;
        if (ptype != 'newin' && pcfg && pcfg.id) pc = Ext.getCmp(pcfg.id);
        else if (ptype != 'newin' && pcfg && pcfg.itemid) pc = c.down('#'+pcfg.itemid);
        else if (pcfg && ptype == 'newin'){
            if (!pend && !pcfg.msgwin){
                //create new win
                pcfg.msgwin = Ext.Msg.progress(title, msg, pendingtext);
                if (pcfg.msgwin.minWidth < 400){
                    Ext.getClass(pcfg.msgwin).prototype.minWidth = 400;
                    pcfg.msgwin.setWidth(400);
                }
            }else{
                if(pend){
                    app.fireEvent('datadone',{
                        model: cfg.modelId, 
                        action: operation.action,
                        success: response.success,
                        donetext: donetext,
                        indicatortype: 'newwin',
                        component: dbc,
                        domask: domask?true:false
                    });
                }
                if (pend && pcfg.msgwin){
                    if (response && response.success){
                        pcfg.msgwin.updateProgress(1, 'Complete(100%)', donetext);
                        Ext.defer(pcfg.msgwin.close, 1000, pcfg.msgwin);
                        pcfg.msgwin = null;
                    }else{//todo, msg prompt box!
                        pcfg.msgwin.updateProgress(1, 'Done, fail!(100%)', donetext);
                        pcfg.msgwin.on('close', function(win, options){
                            Ext.Msg.alert(title, donetext);
                        });
                        Ext.defer(pcfg.msgwin.close, 1000, pcfg.msgwin);
                        pcfg.msgwin = null;
                        //Ext.Msg.alert(title, donetext);
                    }
                }else if (pcfg.msgwin){
                    pcfg.msgwin.updateProgress(number, pendingtext, msg);
                }
            }
            return;
        }else{
            pc = dbc.down('#processstatus');
            if (!pc){
                if (cfg.deffpc && (operation.action == 'update' || operation.action == 'create')){
                    pc = cfg.deffpc;
                }else if (cfg.defpc) pc = cfg.defpc; else pc = Ext.getCmp('processstatus');
            }
            //don't need!
            if (!pc){
                if (pend){
                    app.fireEvent('datadone',{
                        model: cfg.modelId, 
                        action: operation.action, 
                        success: response.success,
                        donetext: donetext,
                        indicatortype: 'noindicator',
                        component: dbc,
                        domask: domask?true:false
                    });
                }
                return;
            }
        }
        if (domask){//do mask
            if (pend && cfg.mask){
                cfg.mask.hide(c).destroy();
                cfg.mask = null;
            }else if (!pend && !cfg.mask){
                //mask priority: pxfg.maskxtype, pcfg.maskid, c, dbc(if localmask)
                var mask = pcfg.maskxtype?dbc.up(pcfg.maskxtype):(pcfg.maskid?c.down('#'+pcfg.maskid):(pcfg.localmask?dbc:c));
                if (!mask) mask = c;
                cfg.mask = new Ext.LoadMask(mask, {msg:title+' ...'});
                cfg.mask.show(mask);
            }
        }
        if (pcfg && ptype == 'text'){
            //todo: class of this text, 
            if (pend){
                pc.getEl().setHTML('<a class="x-progress-text">'+donetext+'</a>');
                Ext.defer(pc.getEl().setHTML(''), 1000, pc.getEl(), ['']);
            }else{
                pc.getEl().setHTML('<a class="x-progress-text">'+pendingtext+'</a>');
            }
        }else{
            var ppc = pc.down('progressbar');
            if (!ppc && !pend){
                ppc = Ext.create('Ext.ProgressBar',{flex:1});
                pc.add(ppc);
            }
            if (pend && ppc){
                ppc.updateProgress(1, donetext, true);
                if (response && response.success){
                    Ext.defer(pc.remove, 1000, pc, [ppc, true]);
                }else{
                    ppc.getEl().on('click', function(){
                        Ext.Msg.alert(title, donetext, function(){
                            Ext.defer(pc.remove, 1000, pc, [ppc, true]);
                        });
                    });
                }
            }else if (ppc) {
                ppc.updateProgress(number, pendingtext, true);
            }
        }
        if(pend){
            app.fireEvent('datadone',{
                model: cfg.modelId, 
                action: operation.action,
                success: response.success,
                donetext: donetext,
                indicatortype: 'normal',
                component: dbc,
                domask: domask?true:false
            });
        }
    }