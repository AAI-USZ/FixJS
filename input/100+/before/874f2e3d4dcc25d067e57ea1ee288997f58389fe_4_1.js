function(){
	$('#projectlist').flexigrid({
	     url:"loadProjectList",
	     dataType:"json",
	     colModel: [
	         { display: '所属物业',name:'company.comName', width: Width*0.15, sortable:true, align: 'center' },
             { display: '项目名称',name:'proName', width: Width*0.15, sortable:true, align: 'center' },
			 { display: '所属地区',name:'proDistrict', width: Width*0.1, sortable:true, align: 'center' },
			 { display: '所属街道',name:'proStreet', width: Width*0.1, sortable:true, align: 'center' },
			 { display: '项目规模', name:'proHouseCount',width: Width*0.1, sortable:true, align: 'center' },
			 { display: '项目类型',name:'proType', width: Width*0.1, sortable:true, align: 'center' },
			 { display: '详细地址',name:'proAddress', width: Width*0.22, sortable:true, align: 'center',hide:'true'  },
			 { display: '交付时间',name:'deliveryTime', width: Width*0.1, sortable:true, align: 'center',hide:'true'  },
			 { display: '项目备注', name:'proDesc',width: Width*0.22, sortable:true, align: 'center' ,hide:'true'},
			 { display: '启用消控',name:'fireEnabled', width: Width*0.1, sortable:true, align: 'center' ,hide:'true'},
			 { display: '是否启用', name:'enabled',width: Width*0.1, sortable:true, align: 'center' ,hide:'true'}
         ],
         buttons : [
	       	 {name: '新增项目', bclass: 'add', onpress : addProject},
	       	 {name: '导入项目', bclass: 'import', onpress : importProject},
	       	 {separator: true}
		 ],
		 searchitems:[
          	 { display: '项目名称', name: 'proName', isdefault:true },
          	 { display: '所属地区', name: 'proDistrict', isdefault:false },
          	 { display: '所属街道', name: 'proStreet', isdefault:false }
         ],
         height:Height*0.96,
         showSearch:true,
         showcheckbox:true,
         usepager: true,
 		 useRp: true,
 		 rp: 15,
 		 operation:true,
		 operationcontent:'<a href="javascript:void(0)" onclick="openEditProject($(this).parent().parent().parent())">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"#\" onclick=\"parent.selectBuildTab($(this).parent().parent().parent(),$(this).parent().parent().parent(),$(this).parent().parent().parent())\">楼宇清单</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"#\" onclick=\"deleteProject($(this).parent().parent().parent(),$(this).parent().parent().parent());\">删除</a>',
		 operationWidth: Width*0.22
    });
}