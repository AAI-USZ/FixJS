function(){
					//console.log(c.has('primitiveList'))// + ' ' + c.primitiveList.data.size())
					if(c.has('primitiveList')){
						//console.log(c.primitiveList.data.size() + ' ' + JSON.stringify(c.primitiveList.toJson()))
						if(c.primitiveList.data.size() === 2){
							var arr = c.primitiveList.data.toJson()
							//console.log('*trying: ' + JSON.stringify(arr))
							if(arr[0] === 'b' && arr[1] === 'c'){
								done()
								return true
							}
						}
					}
				}