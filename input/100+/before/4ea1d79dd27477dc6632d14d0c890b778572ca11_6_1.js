function () {	

		//controls	

		this._getBuilder_()	

		.addTextField({ name:"name",_sharedLabel_:true, dataIndex:"name",anchor:"-20",maxLength:255  })

		.addTextField({ name:"code",_sharedLabel_:true, dataIndex:"code",anchor:"-20",maxLength:32  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		.addTextField({ name:"org", dataIndex:"org",anchor:"-20",maxLength:32  })

		.addTextField({ name:"category", dataIndex:"category",anchor:"-20",maxLength:32  })

		.addTextField({ name:"productCode", dataIndex:"productCode",anchor:"-20",maxLength:32  })

		.addTextField({ name:"productName", dataIndex:"productName",anchor:"-20",maxLength:255  })

		//containers

		.addPanel({ name:"col1", layout:"form",width:210}) 

		.addPanel({ name:"col2", layout:"form",width:210}) 

		.addPanel({ name:"col3", layout:"form",width:210}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}