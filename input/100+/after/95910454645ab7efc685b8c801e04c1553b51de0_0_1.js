function(){
	var efiId = getQueryString("efiId");
	$('#efiId').val(efiId);
	$('#ef_list').flexigrid({
		url:"loadElectricFeeList_ByEFI?efiId="+efiId,
		dataType:"json",
        colModel:[
            { display: '小区', name: 'houseOwner.house.building.project.proName', width: Width*0.15, sortable:true, align: 'center' },
            { display: '房号', name: 'houseOwner.house.houseNum', width: Width*0.1, sortable:true, align: 'center' },
            { display: '业主', name: 'houseOwner.owner.ownerName', width: Width*0.1, sortable:true, align: 'center' },
            { display: '小区均摊金额', name: 'proMeterFee', width: Width*0.15, sortable:true, align: 'center' },
            { display: '电梯均摊金额', name: 'liftMeterFee', width: Width*0.15, sortable:true, align: 'center' },
            { display: '均摊金额合计', name: 'totalMoney', width: Width*0.15, sortable:true, align: 'center' }
        ],
        buttons:[
            { name: '电费修改', bclass: 'edit', onpress: ef_edit },
            { name: '删除电费记录', bclass: 'delete', onpress: ef_delete },
            { name: '删除电费项目', bclass: 'delete', onpress: efi_delete },
            { name: '导出电费项目', bclass: 'import', onpress: efExport}
		],
		searchitems:[
		    { display: '房号', name: 'houseOwner.house.houseNum'},
		    { display: '业主', name: 'houseOwner.owner.ownerName'}
		],
		showSearch:true,
		title:true,
		height:Height*0.83,
        showcheckbox:true,
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true
	});
}