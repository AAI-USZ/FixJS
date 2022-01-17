function(result){
								console.log("Final Result : " + result);
								if(result == "OK")
									GoogleReader.postData(url,data,callback);
								}