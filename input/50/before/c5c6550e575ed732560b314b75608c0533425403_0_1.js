function(data){
				if(data.status == 'success'){
					alert(data.msg)
					location.reload();
				}
				if(data.status == 'error'){
					alert(data.msg);
				}
			}