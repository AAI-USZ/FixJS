function () {	

		//controls	

		this._getBuilder_()	

		.addLov({ name:"importMapName", xtype:"net.nan21.dnet.module.ad.impex.lovs.ImportMap", dataIndex:"importMapName",anchor:"-20",maxLength:255,retFieldMapping: [{lovField:"id", dsField: "importMapId"} ]  })

		.addLov({ name:"dataSource", xtype:"net.nan21.dnet.module.ad.system.lovs.SysDataSource", dataIndex:"dataSource",anchor:"-20",maxLength:255,retFieldMapping: []  })

		.addTextField({ name:"path", dataIndex:"path",anchor:"-20",maxLength:255  })

		.addTextField({ name:"fileName", dataIndex:"fileName",anchor:"-20",maxLength:255  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		//containers

		.addPanel({ name:"col1", layout:"form", width:250}) 

		.addPanel({ name:"col2", layout:"form",width:210}) 

		.addPanel({ name:"col3", layout:"form", width:170}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}