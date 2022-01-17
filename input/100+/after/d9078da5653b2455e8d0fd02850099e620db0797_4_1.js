function(){
	$(".content .innercontent").eq(0).show();
	var editURL = "getOwner?ownerId=";
	var editWindow = "#ownerEdit";
	
	$('#owner_list').flexigrid({
		url:"loadOwnerList",
		dataType:"json",
        colModel:[
			{ display: '小区', name: 'Pro_Name', width: Width*0.1, sortable:true, align: 'center' },
			{ display: '房号', name: 'h.House_Num', width: Width*0.08, sortable:true, align: 'center' },
			{ display: '姓名', name: 'Owner_Name', width: Width*0.08, sortable:true, align: 'center' },
            { display: '性别', name: 'Gender', width: Width*0.05, sortable:true, align: 'center' },
            { display: '手机号码', name: 'Mobile', width: Width*0.1, sortable:true, align: 'center' },
            { display: '家庭电话', name: 'Home_Phone', width: Width*0.1, sortable:true, align: 'center' },
            { display: '房屋面积', name: 'h.House_Area', width: Width*0.08, sortable:true, align: 'center' },
            { display: '工作单位', name: 'Organization', width: Width*0.22, sortable:true, align: 'center' }
        ],
        buttons:[
            { name: '添加业主', bclass: 'add', onpress: ownerAdd },
            { separator: true },
            { name: '业主信息导入', bclass:'import', onpress: ownerImport },
            { separator: true },
            { name: '业主信息导出', bclass:'export', onpress: ownerExport },
            { separator: true },
            { name: '删除业主', bclass:'delete', onpress: ownerDelete }
		],
		searchitems:[
			{ display: '小区', name: 'Pro_Name', isDefault:false },
			{ display: '楼号', name: 'Buil_Num', isDefault:false },
			{ display: '房号', name: 'h.House_Num', isDefault:false },
		    { display: '姓名', name: 'Owner_Name', isDefault:true },
		    { display: '手机号码', name: 'Mobile', isDefault:false }
		],
		searchQueryStrs:[
            {selectName:'qtype1',queryStrName:'query1'},
            {selectName:'qtype2',queryStrName:'query2'}
      	],
		showSearch:true,
		height:Height*0.8,
        showcheckbox:true,
        nomsg: '没有符合条件的业主记录',
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true,
		operation:true,
		operationcontent:'<a href="javascript:void(0)" onclick="openEditWindow(\''+editWindow+'\',\''+editURL+'\'+$(this).parent().parent().parent().attr(\'id\').substr(3))">编辑</a>',
		operationWidth: Width*0.08
	});
}