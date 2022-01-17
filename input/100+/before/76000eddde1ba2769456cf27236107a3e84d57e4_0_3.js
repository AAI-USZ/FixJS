function(){
			var hash = location.hash.substring(1);
			if(villo.trim(hash) !== ""){
				//TODO: 404
				var hashArr = hash.split("/");
				if(hashArr.length === 3){
					var doc = this.docs[hashArr[0]][hashArr[1]][hashArr[2]];
					$("#content").html(doc.html);
					
					var strip = function(og){
						return og.replace(/(<([^>]+)>)/ig, "");
					}
					
					//Strip HTML tags from code elements: 
					$("code").each(function(index){
						var newText = strip($(this).text());
						$(this).text(newText);
					});
					
					$("p > code").addClass("prettyprint");
					$("pre > code").addClass("prettyprint linenums");
					prettyPrint();
				}else{
					var page = this.pages[hash];
					$("#content").html(page.html);
				}
			}else{
				var page;
				for(var first in this.pages){
					page = this.pages[first];
					break;
				}
				$("#content").html(page.html);
			}
			window.scrollTo(0, 0);
		}