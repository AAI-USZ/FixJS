function(){
	var comId = getQueryString("comId");
	var proId = getQueryString("proId");
	var year = getQueryString("year");
	var month = getQueryString("month");
	if (comId==null){
		url="loadCondoFeeList_ByProject?proId="+proId+"&year="+year;
	} else {
		url="loadCondoFeeList_ByCompany?comId="+comId+"&year="+year;
	}
	if (month!=null){
		url=url+"&month="+month;
	}
	$('#cf_list').flexigrid({
		url:url,
		dataType:"json",
        colModel:[
            { display: '小区', name: 'Pro_Name', width: Width*0.15, sortable:true, align: 'center' },
            { display: '房号', name: 'h.House_Num', width: Width*0.08, sortable:true, align: 'center' },
            { display: '业主', name: 'Owner_Name', width: Width*0.08, sortable:true, align: 'center' },
            { display: '月份', name: 'CF_Month', width: Width*0.04, sortable:true, align: 'center' },
            { display: '状态', name: 'State', width: Width*0.07, sortable:true, align: 'center' },
            { display: '应收金额', name: 'Ought_Money', width: Width*0.07, sortable:true, align: 'center' },
            { display: '实收金额', name: 'Fetch_Money', width: Width*0.07, sortable:true, align: 'center' },
            { display: '录入时间', name: 'Input_Time', width: Width*0.1, sortable:true, align: 'center' },
            { display: '备注', name: 'Comment', width: Width*0.16, sortable:true, align: 'center' }
        ],
        buttons:[
     		{ name: '数据导出', bclass:'import', onpress: cfExport },
     		{ separator: true },
	    ],
		searchitems:[
		    { display: '小区', name: 'Pro_Name', isdefault:false },
 		    { display: '房号', name: 'h.House_Num', isdefault:false },
 		    { display: '业主', name: 'Owner_Name', isdefault:false },
 		    { display: '状态', name: 'State', isdefault:true },
 		    { display: '录入时间', name: 'Input_Time', isDefault:false}
		],
		title:true,
		showSearch:true,
        height:Height*0.9,
        showcheckbox:true,
        nomsg: '没有符合条件的物业费记录',
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true
	});
}