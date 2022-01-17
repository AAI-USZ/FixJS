function(){
						var diffNum = $(this).attr("value");
						if($(this).is(":checked")){
							appliedDiffs.push(rawDiffsList[diffNum]);	
						}else{
							appliedDiffs.splice(
								appliedDiffs.indexOf(rawDiffsList[diffNum]),1);
						}
					}