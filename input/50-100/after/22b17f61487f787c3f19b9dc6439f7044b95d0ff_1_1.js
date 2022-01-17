function(data){
			if(data.result=='success'){
				$.ajax({
					type: 'POST',
					url: 'cf_item_delete?cfiId='+cfiId,
					dataType: "json",
					success: function(data){
						alert("项目删除成功");
						window.parent.location.href='cf_item_list.jsp';
					}
				});
			} else {
				alert("您无法删除该项目,可能的原因：\n(1)该项目已经有物业费记录被小区管理员录入");
			}
		}