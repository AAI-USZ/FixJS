function(){
					if(c.has('primitiveList') && c.primitiveList.data.size() === 2){
						var arr = c.primitiveList.data.toJson()
						if(arr[0] === 'a' && arr[1] === 'c'){
							done()
							return true
						}
					}
				}