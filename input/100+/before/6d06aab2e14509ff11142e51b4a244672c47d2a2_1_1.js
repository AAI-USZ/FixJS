function(){
		this.store=new Pyfrid.LogManagerStore({
			remoteSort:false, 
	        sortInfo:{field:'time', direction:'DESC'}, 
	        reader: new Ext.data.JsonReader({ 
	            totalProperty: "results", 
	            root: "rows",
	            fields:[
	                {name:'time'}, 
	                {name:'level'}, 
	                {name:'object'}, 
	                {name:'message'} 
	            ] 
	        }) 
		});
	
	    var cm = new Ext.grid.ColumnModel([ 
	        { header:"Time", dataIndex: 'time', width:100, renderer: this.convertTime        },
	        { header:"Level", dataIndex: 'level', width:55       }, 
	        { header:"Object", dataIndex: 'object', width:100    }, 
	        { header:"Message", width:500,  dataIndex: 'message',
		        renderer: function (val,meta, record) { 
	                      //v : value , p : cell 
	                      //var obj = record.data.object;
						  //var msg = record.data.message;
						  //var tip = 'Object: '+obj+'<br />';
						  //tip += '<br />';
						  //tip += 'Message: '+Ext.util.Format.nl2br(msg)+'<br />';
						//meta.attr = 'ext:qtip="'+tip+'" ext:qtitle="Formatted message"';
						meta.css="log-"+record.data.level;
						return val;
		        }
	        }
	    ]);
                   
	    cm.defaultSortable = true; 
	 
	    var gridView = new Ext.grid.GroupingView({}); 
	     
		Ext.apply(this,{
			region: 'south',
	        split: true,
	        height: 100,
	        minSize: 50,
	        maxSize: 800,
	        collapsible: true,
	        title: 'Output',
			ds: this.store, 
        	cm: cm, 
        	title: 'Log Viewer', 
        	frame: false, 
        	autoExpandColumn: 3, 
        	view: gridView
		});
		
		Pyfrid.LogManager.superclass.initComponent.apply(this, arguments);
		
	}