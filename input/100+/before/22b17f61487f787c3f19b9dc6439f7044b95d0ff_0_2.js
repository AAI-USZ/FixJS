function(data){
			if(data.result=='success'){
				openEditWindow('#cfInput','selectCondoFee?action=record&idStr='+idString);
			}
			else{
				alert("您选中的物业费记录无法录入,可能有以下原因：\n(1)有记录尚未设置应收金额\n(2)有记录已经通过审核");
			}
		}