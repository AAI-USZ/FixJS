function(){
						var diffNum = $(this).attr("value");
						console.log("diffNum",diffNum);
						console.log("list",rawDiffsList);
						console.log("entry",rawDiffsList[diffNum]);
						if($(this).is(":checked")){
							appliedDiffs.push(rawDiffsList[diffNum]);	
						}else{
							appliedDiffs.splice(
								appliedDiffs.indexOf(rawDiffsList[diffNum]),1);
						}
					}