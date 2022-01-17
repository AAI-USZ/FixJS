function () {	

		//controls	

		this._getBuilder_()	

		.addLov({ name:"sourceCode", xtype:"net.nan21.dnet.module.bd.uom.lovs.UnitsOfMeasure", dataIndex:"sourceCode",anchor:"-20",maxLength:32,retFieldMapping: [{lovField:"id", dsField: "sourceId"} ]  })

		.addLov({ name:"targetCode", xtype:"net.nan21.dnet.module.bd.uom.lovs.UnitsOfMeasure", dataIndex:"targetCode",anchor:"-20",maxLength:32,retFieldMapping: [{lovField:"id", dsField: "targetId"} ]  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		//containers

		.addPanel({ name:"col1", layout:"form",width:210, height:50}) 

		.addPanel({ name:"col2", layout:"form",width:210}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}