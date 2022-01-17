function() {
			if(wycVal.clickNum >=0){
		var dataIndex = $(".j_diskOperate")[wycVal.clickNum].getAttribute('diskdata');
		console.log($(".j_diskOperate")[wycVal.clickNum]);
			dataIndex = eval(dataIndex);			
			$.get(requestURL.disk_part_delete, {
				dev : dataIndex.dev,
				num : dataIndex.num,
			},
				function (data) {
				wycFun.affirmBtnEnter(data,'ok',['删除成功','删除失败'],150,112);
			}, "json");
				}
					$(this).dialog( "close" );
				}