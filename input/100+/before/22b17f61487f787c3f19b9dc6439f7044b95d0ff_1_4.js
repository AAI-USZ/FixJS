function(data){
			if(data.result=='success'){
				openEditWindow('#cfAudit','selectCondoFee?action=audit&idStr='+idString);
			}
			else{
				alert("您选中的记录有无法审核,可能有以下原因：\n(1)该记录已经通过审核(2)该记录尚未录入实收金额");
			}
		}