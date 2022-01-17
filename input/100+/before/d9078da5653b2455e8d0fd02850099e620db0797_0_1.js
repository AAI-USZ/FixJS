function(){
	$(".content .innercontent").eq(0).show();
	$('#module_list').flexigrid({
		colModel:
			[{ display:'序号', width: Width*0.05, align:'center' },
			 { display:'名称', width: Width*0.15, align:'center' },
			 { display:'级别', width: Width*0.1, align:'center' },
			 { display:'排序', width: Width*0.1, align:'center' },
			 { display:'是否启用', width: Width*0.1, align:'center' },
			 { display:'管理模块', width: Width*0.1, align:'center' },
			 { display:'模块链接', width: Width*0.2, align:'left' },
			 { display:'操作', width: Width*0.15, align:'center' }
			],
		height:Height*0.95
	});
}