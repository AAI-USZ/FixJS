function(resp){
						
						if(resp.msg)
						{
							console.log(resp.msg);
						}
						
						else
						{
							console.log(resp);
						}
						
						setTimeout(function(){
							
							lib.hide(function(resp)
									{
										if(resp.msg)
										{
											console.log(resp.msg);
										}
										
										else
										{
											console.log(resp);
										}
										
										setTimeout(function(){
											
											lib.show(success, fail);
										}, 15000)
										
									}, fail);
						}, 15000);
						
					}