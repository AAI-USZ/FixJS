function(){
    $('#ownerRepairList').flexigrid({
    	url:"loadOwnerRepairList",
    	dataType:"json",
    	colModel: [
    	    { display: '单号',name:'opNum', width: Width*0.035, sortable:true, align: 'center' },
    	    { display: '小区', name:'houseOwner.house.building.project.proName',width: Width*0.1, sortable:true, align: 'center' },
    	    { display: '房号', name:'houseOwner.house.houseNum',width: Width*0.05, sortable:true, align: 'center' },
    	    { display: '报修人',name:'applyPerson', width: Width*0.05, sortable:true, align: 'center' },
    	    { display: '联系方式',name:'contactPhone', width: Width*0.13, sortable:true, align: 'center' },
    	    { display: '报修类型',name:'repairType', width: Width*0.08, sortable:true, align: 'center' },
    	    { display: '报修时间',name:'applyTime', width: Width*0.08, sortable:true, align: 'center' },
    	    { display: '状态',name:'state', width: Width*0.08, sortable:true, align: 'center'},
    	    { display: '人工费',name:'laborFee', width: Width*0.05, sortable:true, align: 'center' },
    	    { display: '材料费',name:'materialFee', width: Width*0.05, sortable:true, align: 'center' },
    	    { display: '费用合计',name:'totalFee', width: Width*0.05, sortable:true, align: 'center' }
    	],
        buttons : [
            {name: '添加维修单', bclass: 'add', onpress : addOwnerRepair},
            {separator: true},
            {name: '删除维修单', bclass: 'delete', onpress : deleteOwnerRepair}
	    ],
	    searchitems:[
	        { display: '小区', name: 'houseOwner.house.building.project.proName', isDefault:false },
	        { display: '报修类型', name: 'repairType', isDefault:true },
	        { display: '状态', name: 'state', isDefault:false }
	    ],
	    searchQueryStrs:[
            {selectName:'qtype1',queryStrName:'query1'},
            {selectName:'qtype2',queryStrName:'query2'}
     	],
        height:Height*0.96,
        showcheckbox:true,
        showSearch:true,
        usepager: true,
	    useRp: true,
	    rp: 15,
	    operation:true,
	    operationcontent:'<a href="javascript:void(0)" onclick="openEditOwnerRepair($(this).parent().parent().parent())">编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"openAttach($(this).parent().parent().parent());\">附件</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a  href=\"javascript:void(0)\" onclick=\"printOwnerRepair($(this).parent().parent().parent());\">打印</a>',
	    operationWidth: Width*0.13
	});
}