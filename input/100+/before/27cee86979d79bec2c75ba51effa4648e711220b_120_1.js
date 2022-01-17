function () {	

		//controls	

		this._getBuilder_()	

		.addTextField({ name:"name",_sharedLabel_:true, dataIndex:"name",anchor:"-20",maxLength:255  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		.addCombo({ name:"category", xtype:"combo", dataIndex:"category",anchor:"-20",store:[ "length", "mass", "volume", "other"]  })

		//containers

		.addPanel({ name:"col1", layout:"form",width:210}) 

		.addPanel({ name:"col2", layout:"form",width:210}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}