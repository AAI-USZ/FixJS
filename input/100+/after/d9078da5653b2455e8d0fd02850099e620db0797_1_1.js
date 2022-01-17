function(){
	var editURL = "getUser?userId=";
	var editWindow = "#editUser";
	
	$(".content .innercontent").eq(0).show();
	$("#tab1").click(function(){
		$(".nav li").removeClass("active");	
		$(this).addClass('active');
		$(".content .innercontent").hide().eq(0).show();
		return false;
	});
	$('#user_list').flexigrid({
		url:"loadUserList",
		dataType:"json",
        colModel:[
            { display: '真实姓名', name: 'tbUser.realname', width: Width*0.08, sortable:true, align: 'center' },
            { display: '用户名', name: 'tbUser.username', width: Width*0.08, sortable:true, align: 'center' },
            { display: '手机号码', name: 'tbUser.mobile', width: Width*0.08, sortable:true, align: 'center' },
            { display: '身份证号', name: 'tbUser.identify', width: Width*0.13, sortable:true, align: 'center' },
            { display: '职位', name: 'tbUser.position', width: Width*0.07, sortable:true, align: 'left' },
            { display: '角色', name: 'tbRole.roleName', width: Width*0.1, sortable:true, align: 'center' },
            { display: '用户组', name: 'tbGroup.groupName', width: Width*0.2, sortable:true, align: 'left' },
            { display: '是否启用', name: 'tbUser.enabled', width: Width*0.05, sortable:true, align: 'center' }
        ],
        buttons:[
            { name: '添加用户', bclass: 'add', onpress: userAdd },
     	    { separator: true },
     		{ name: '删除用户', bclass:'delete', onpress: userDelete }
     	],
     	searchitems:[
     		{ display: '用户名', name : 'tbUser.username' },
     	    { display: '真实姓名', name : 'tbUser.realname', isdefault : true  },
     	    { display: '手机号码', name : 'tbUser.mobile' },
     	    { display: '用户组', name : 'tbGroup.groupName' },
     	    { display: '角色', name : 'tbRole.roleName' }
     	],
     	showSearch:true,
		height:Height*0.75,
        showcheckbox:true,
        nomsg: '没有符合条件的用户',
        usepager:true,
        useRp:true,
        rp: 15,
		showTableToggleBtn: true,
		operation:true,
		operationcontent:'<a href="javascript:void(0)" onclick="openEditWindow(\''+editWindow+'\',\''+editURL+'\'+$(this).parent().parent().parent().attr(\'id\').substr(3))">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="passwordReset($(this).parent().parent().parent().attr(\'id\').substr(3))">重置密码</a>',
		operationWidth: Width*0.1
	});
}