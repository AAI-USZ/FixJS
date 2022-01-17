function(text){
			console.log(text);
// \r\n  return cariage then new line then new line
				var textLines = text.split(/\r\n|\n/);
// var headers is the value headers - project, project type , first name etc... I'm setting up headers to just pull out the headers from the array
				var headers = textLines[0].split(",");
				
				var lines = [];	
				for (var i=1; i<textLines.length;i++){
					var text = textLines[i].split(",");
					if (text.length == headers.length){
						var projectData = [];						
						for (var j=0; j<headers.length;j++){
							projectData.push(text[j]);
						}
						lines.push(projectData);
					} 
				}
				for (var t=0; t<lines.length;t++){
					var thisProjectData = lines[t];	
				
				$(""+
					"<div>"+  
						"<h2>" + thisProjectData[0] +"</h2>"+
						"<p>" + thisProjectData[1] +"</p>"+
						"<p>" + thisProjectData[2] +"</p>"+
						"<p>" + thisProjectData[3] +"</p>"+
						"<p>" + thisProjectData[4] +"</p>"+
						"<p>" + thisProjectData[5] +"</p>"+
						"<p>" + thisProjectData[6] +"</p>"+
						"<p>" + thisProjectData[7] +"</p>"+
						"<p>" + thisProjectData[8] +"</p>"+
						"<p>" + thisProjectData[9] +"</p>"+
						"<p>" + thisProjectData[10] +"</p>"+
						"<p>" + thisProjectData[11] +"</p>"+
					"</div>"
				).appendTo("#dataHolder");
				}
			}