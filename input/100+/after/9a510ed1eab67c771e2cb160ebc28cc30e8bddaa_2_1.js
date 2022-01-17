function(){
	$(".content .innercontent").eq(0).show();
    $('#smsHistory').flexigrid({
    	url:"loadHistory",
    	dataType:"json",
        colModel: [
            { display: '所属物业', name:'SMSCompany.company.comName', width: Width*0.08, sortable:true, align: 'center' },  
            { display: '发送时间', name:'smssTime', width: Width*0.07, sortable:true, align: 'center' },
            { display: '状态', name:'smssState', width: Width*0.06, sortable:true, align: 'center' },
            { display: '发送人', name:'smssPerson', width: Width*0.05, sortable:true, align: 'center' },
            { display: '消息内容', name:'smssContent', width: Width*0.3, sortable:true, align: 'center' },
            { display: '接收人', name:'smssReceiver', width: Width*0.38, sortable:true, align: 'center' }
        ],
        searchitems:[
 		    { display: '接收人', name: 'smssReceiver', isdefault:false },
 		    { display: '发送人', name: 'smssPerson', isdefault:false },
 		    { display: '状态', name: 'smssState', isdefault:true },
 		    { display: '发送时间', name: 'smssTime', isdefault:false },
 		    { display: '消息内容', name: 'smssContent', isdefault:false }
 		],
 		showSearch:true,
        height:Height*0.96,
        showcheckbox:true,
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true
    });
}