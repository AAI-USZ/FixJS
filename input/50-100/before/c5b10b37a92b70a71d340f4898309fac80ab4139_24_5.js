function(){
					if(c.has('primitiveList') && c.primitiveList.data.size() === 2){
						var arr = c.primitiveList.data.toJson()
						//console.log('*trying: ' + JSON.stringify(arr))
						if(arr[0] === 'b' && arr[1] === 'c'){
							done()
						}
					}
				}