function () {	

		//controls	

		this._getBuilder_()	

		.addTextField({ name:"name",_sharedLabel_:true, dataIndex:"name",anchor:"-20",maxLength:255  })

		.addTextField({ name:"code",_sharedLabel_:true, dataIndex:"code",anchor:"-20",maxLength:32  })

		.addTextField({ name:"iso2", dataIndex:"iso2",anchor:"-20",maxLength:2,caseRestriction:"uppercase"  })

		.addTextField({ name:"iso3", dataIndex:"iso3",anchor:"-20",maxLength:3,caseRestriction:"uppercase"  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		//containers

		.addPanel({ name:"col1", layout:"form", width:220}) 

		.addPanel({ name:"col2", layout:"form", width:170}) 

		.addPanel({ name:"col3", layout:"form", width:170}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}