function flexGrid(url)
{
	var config={
        url: url,
		dataType: 'json',
		colModel: [
	        { display: '姓名',name:'realname', width: Width*0.2, sortable:true, align: 'center' },
	        { display: '联系方式',name:'mobile', width: Width*0.3, sortable:true, align: 'center' },
	        { display: '职位',name:'position', width: Width*0.2, sortable:true, align: 'center' },
	    ],
	    buttons: [
			{ name: '提交', bclass: 'add', onpress : submitForm},
			{ separator: true },      
			{ name: '取消', bclass: 'delete', onpress : closeFrame},
			{ separator: true },      
	    ],
		height: Height*0.85,
 		showcheckbox:true,
	    usepager: true,
		useRp: true,
		rp: 15,
		nomsg: '无符合条件的用户'
	};
	config.url=url;
	$("#SMSuserlist").flexigrid(config);
    $("#SMSuserlist").flexOptions(config).flexReload();  
}