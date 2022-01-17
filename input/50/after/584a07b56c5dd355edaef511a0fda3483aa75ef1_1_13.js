function(err, result){
							if(result){
								console.log('Added question notification');
								callback(null, esResult);
							}else{
								callback(err);
							}
						}