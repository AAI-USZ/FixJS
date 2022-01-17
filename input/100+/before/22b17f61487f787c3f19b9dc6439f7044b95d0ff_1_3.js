function(data){
			if(data.result=='success'){
				$.ajax({
					type: 'POST',
					url: 'cf_delete?idStr='+idString,
					success: function(data){
						alert("记录删除成功");
						window.location.href='cf_list_by_item.jsp?cfiId='+getQueryString("cfiId");
					}
				});
			} else {
				alert("您选中的记录不能删除,可能有以下原因：\n(1)该记录已经录入实收金额\n(2)该记录已经通过审核");
				return;
			}
		}