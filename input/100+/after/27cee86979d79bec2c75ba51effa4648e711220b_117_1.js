function () {	

		//controls	

		this._getBuilder_()	

		.addTextField({ name:"name",_sharedLabel_:true, dataIndex:"name",anchor:"-20",maxLength:255  })

		.addTextField({ name:"code",_sharedLabel_:true, dataIndex:"code",anchor:"-20",maxLength:32  })

		.addTextField({ name:"iso", dataIndex:"iso",anchor:"-20",maxLength:32  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		.addLov({ name:"countryCode", xtype:"net.nan21.dnet.module.bd.geo.lovs.Countries", dataIndex:"countryCode",anchor:"-20",maxLength:32,retFieldMapping: [{lovField:"id", dsField: "countryId"} ]  })

		//containers

		.addPanel({ name:"col1", layout:"form",width:210}) 

		.addPanel({ name:"col2", layout:"form",width:210}) 

		.addPanel({ name:"col3", layout:"form", width:170}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}