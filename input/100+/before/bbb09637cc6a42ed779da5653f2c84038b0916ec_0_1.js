function(){
	var store = new Ext.data.Store({
		model:'BGT.Event'
	});

	var dockedItems = [];
	['movements', 'stats', 'quit', 'map'].forEach(function(category){
		dockedItems.push({
			xtype:'checkbox',
			boxLabel:category,
			listeners:{
				change:function(checkbox, checked){
					method = (checked ? '' : 'un') + 'subscribe';
					socket[method](category); 
				}
			}
		});
	});

	var pushToStore = function(type, data) {
		var event = Ext.create('BGT.Event', {
			timestamp:new Date(),
			type:type,
			data:data
		});
		store.insert(0, event);
		while (store.getCount() > 30) store.removeAt(30);
	};

	var socket = Ext.create('BGT.Socket', {
		url:'wss://' + location.hostname + '/bgt/socket'
	});

	socket.on('connect', function(){
		pushToStore('socket connected');
	});
	socket.on('message', function(data){
		pushToStore('message received', Ext.JSON.encode(data));
	});
	socket.connect();

	Ext.create('Ext.container.Viewport', {
		layout:'border',
		items:[Ext.create('Ext.grid.Panel',{
			title:'Debugging console',
			region:'east',
			split:true,
			width:400,
			store:store,
			dockedItems:[{
				dock:'top',
				xtype:'toolbar',
				items:dockedItems
			}],
			columns:[
				{header:'Timestamp', dataIndex:'timestamp', xtype:'datecolumn', format:'d.m.Y H:i:s', width:150},
				{header:'Typ', dataIndex:'type'},
				{header:'Daten', dataIndex:'data', flex:1}
			]
		}), Ext.create('BGT.map.Panel', {
			title:'Karte',
			region:'center',
			width:300,
			socket:socket
		})]
	});
}