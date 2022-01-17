function(data){
			if(data.result=='success'){
				openEditWindow('#cfEdit','selectCondoFee?action=edit&idStr='+idString);
			}
			else{
				alert("您选中的记录有已经缴纳物业费的记录，无法修改");
			}
		}