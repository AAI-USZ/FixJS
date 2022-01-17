function grid(url){
	var config = {
		url: url,
    	dataType:"json",
    	colModel: [
            { display: '房号', name:'houseNum', width: Width*0.2, sortable:true, align: 'center' },
 		    { display: '业主', name:'ownerName', width: Width*0.2, sortable:true, align: 'center' },
 	        { display: '电话', name:'mobile', width: Width*0.4, sortable:true, align: 'center' }
 		],
 		searchitems : [
 		    { display: '房号', name : 'houseNum', isdefault: true },
 		    { display: '业主', name : 'ownerName', isdefault: false }
 		],
 		buttons: [
			{ name: '提交', bclass: 'add', onpress : submitForm},
			{ separator: true },      
			{ name: '取消', bclass: 'delete', onpress : closeFrame},
			{ separator: true },      
	    ],
	    height: Height*0.75,
 		showSearch:true,
 		showcheckbox:true,
 		usepager: true,
 		useRp: true,
 		rp: 15,
 		nomsg: '无符合条件的业主'
	};
	config.url=url;
	$('#SMSownerlist').flexigrid(config);
	$('#SMSownerlist').flexOptions(config).flexReload();
}