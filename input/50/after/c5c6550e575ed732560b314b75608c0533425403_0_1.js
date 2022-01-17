function(data){
				if(data.status == 'success'){
					$(this).dialog('close');
					// alert(data.msg);
					location.reload();
				}
				if(data.status == 'error'){
					alert(data.msg);
				}
			}