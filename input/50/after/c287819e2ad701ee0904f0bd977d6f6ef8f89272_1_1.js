function(result){
								console.log("Final Result : " + result);
								if(result == "OK"){
										GoogleReader.retries = 0;
										GoogleReader.postData(url,GoogleReader.updateData(data),callback);
									}
								}