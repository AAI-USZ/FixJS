function(data){
												if(data.status == 'success'){
													$(this).dialog('close');
													location.reload();
												}
												if(data.status == 'error'){
													alert(data.msg);
												}
											}