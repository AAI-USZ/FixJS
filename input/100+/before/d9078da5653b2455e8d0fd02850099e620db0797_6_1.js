function(){
	var houseId = getQueryString("houseId");
	$('#cf_list').flexigrid({
		url:"loadCondoFeeList_ByHouse?houseId="+houseId,
		dataType:"json",
        colModel:[
            { display: '年份', name: 'cfYear', width: Width*0.1, sortable:true, align: 'center' },
            { display: '月份', name: 'cfMonth', width: Width*0.1, sortable:true, align: 'center' },
            { display: '状态', name: 'state', width: Width*0.1, sortable:true, align: 'center' },
            { display: '应收金额', name: 'oughtMoney', width: Width*0.1, sortable:true, align: 'center' },
            { display: '实收金额', name: 'fetchMoney', width: Width*0.1, sortable:true, align: 'center' },
            { display: '录入时间', name: 'inputTime', width: Width*0.12, sortable:true, align: 'center' },
            { display: '备注', name: 'comment', width: Width*0.25, sortable:true, align: 'center' }
        ],
        buttons:[
            { name: '缴费录入', bclass: 'add', onpress: cfInput },
            { name: '短信催缴', bclass: 'add', onpress: smsInform }
		],
		searchitems:[
		    { display: '年份', name : 'cfYear' },
		    { display: '月份', name : 'cfMonth' },
		    { display: '状态', name : 'state', isdefault : true }
		],
		title:true,
		showSearch:true,
		height:Height*0.9,
        showcheckbox:true,
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true,
        nomsg: '没有符合条件的物业费记录'
	});
}