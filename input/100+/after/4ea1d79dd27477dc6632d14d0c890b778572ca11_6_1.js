function () {	

		//controls	

		this._getBuilder_()	

		.addTextField({ name:"name",_sharedLabel_:true, dataIndex:"name",anchor:"-20",maxLength:255  })

		.addTextField({ name:"code",_sharedLabel_:true, dataIndex:"code",anchor:"-20",maxLength:32  })

		.addBooleanField({ name:"active",_sharedLabel_:true, dataIndex:"active",anchor:"-20"  })

		.addLov({ name:"org", xtype:"net.nan21.dnet.module.bd.org.lovs.LegalEntityOrganizations", dataIndex:"org",anchor:"-20",maxLength:32,retFieldMapping: [{lovField:"id", dsField: "orgId"} ]  })

		.addLov({ name:"category", xtype:"net.nan21.dnet.module.fi.asset.lovs.AssetCategories", dataIndex:"category",anchor:"-20",maxLength:32,retFieldMapping: [{lovField:"id", dsField: "categoryId"} ]  })

		.addLov({ name:"productCode", xtype:"net.nan21.dnet.module.md.mm.prod.lovs.Products", dataIndex:"productCode",anchor:"-20",maxLength:32,retFieldMapping: [{lovField:"id", dsField: "productId"} ]  })

		//containers

		.addPanel({ name:"col1", layout:"form",width:210}) 

		.addPanel({ name:"col2", layout:"form", width:250}) 

		.addPanel({ name:"col3", layout:"form", width:170}) 

		.addPanel({ name:"main", layout: { type:"hbox", align:'top' , pack:'start', defaultMargins: {right:5, left:5}} , autoScroll:true, padding:"0 30 0 0" })     

		

	}