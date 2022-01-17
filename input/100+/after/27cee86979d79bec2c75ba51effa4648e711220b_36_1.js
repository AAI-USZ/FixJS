function () {	

		//controls	

		this._getBuilder_()	

		.addTextField({ name:"name",_sharedLabel_:true, dataIndex:"name",anchor:"-20",maxLength:255  })

		.addTextField({ name:"code",_sharedLabel_:true, dataIndex:"code",anchor:"-20",maxLength:32  })

		.addLov({ name:"reportServer", xtype:"net.nan21.dnet.module.ad.report.lovs.ReportServers", dataIndex:"reportServer",anchor:"-20",maxLength:255,retFieldMapping: [{lovField:"id", dsField: "reportServerId"} ]  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		.addTextField({ name:"contextPath", dataIndex:"contextPath",anchor:"-20",maxLength:255  })

		//containers

		.addPanel({ name:"col1", layout:"form",width:210}) 

		.addPanel({ name:"col2", layout:"form", width:250}) 

		.addPanel({ name:"col3", layout:"form", width:170}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}