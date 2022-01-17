function(data,b) { 
				//console.log('json loaded')
				//console.log(data)
				addBaseID(data, "id")
				//convertLinks(data)
				jsonData = JSON.stringify(data)
				loadJSON(data)
				//console.log('sending to tulip... :')
				//console.log(jsonData)
				createTulipGraph(jsonData)
			}