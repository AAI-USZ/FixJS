function(){
	var houseId = getQueryString("houseId");
	$('#houseId').val(houseId);
	$('#ef_list').flexigrid({
		url:"loadElectricFeeList_ByHouse?houseId="+houseId,
		dataType:"json",
        colModel:[
            { display: '起始日期', name: 'electricFeeItem.beginDate', width: Width*0.15, sortable:true, align: 'center' },
            { display: '结束日期', name: 'electricFeeItem.endDate', width: Width*0.15, sortable:true, align: 'center' },
            { display: '小区均摊金额', name: 'proMeterFee', width: Width*0.15, sortable:true, align: 'center' },
            { display: '电梯均摊金额', name: 'liftMeterFee', width: Width*0.15, sortable:true, align: 'center' },
            { display: '均摊金额合计', name: 'totalMoney', width: Width*0.15, sortable:true, align: 'center' }
        ],
        buttons:[
            { name: '电费预存', bclass: 'add', onpress: efc_Add },
            { name: '缴费历史', bclass: 'history', onpress: efc_list }
		],
		title:true,
		height:Height*0.9,
        showcheckbox:true,
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true
	});
}