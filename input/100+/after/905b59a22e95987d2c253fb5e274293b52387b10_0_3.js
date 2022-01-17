function (data) {
            var buttonSelectedList = $("input:checkbox:checked", buttonListContainer);

            if (buttonSelectedList.length == 0)
                buttonSelectedList = $("input:checkbox", buttonListContainer);

            resultContainer.empty().hide();

            if (resultsDataList && resultsDataList.rows && resultsDataList.rows.length > 0) {
				var totalHeight = 0;
				var headingContainerArr = new Array();
                buttonSelectedList.each(function () {
                    var filtertype = $(this).attr("filtertype");
                    var filtername = $(this).attr("filtername");
                    var headingContainer = null;
					var groupHeight = 1;
                    $.each(resultsDataList.rows, function (key, val) {
                        if (filtertype == val["type"]) {
                            if (!headingContainer) {
                                headingContainer = $("<div class='resourceGroup'></div>");
                                headingContainer.append("<h2>" + filtername + "</h2>");
                            }
							groupHeight += 1;
                            var resourceItem = $("<div class='resourceItem'><h3>" + val["name"] + "</h3><a href='" + cleanURLLink(val["url"]) + "'><strong>website:</strong>" + cleanURLView(val["url"]) + "</a></br>short description about the resource here</div>").appendTo(headingContainer);
							resourceItem.children("a").click(function(){recordOutboundLink(this,'Resource',val["type"] + " - " + val["name"]); return false;});
						}
                    })
					
					if(headingContainer != null)
					{
						totalHeight += groupHeight;
						headingContainerArr.push([headingContainer, groupHeight]);
					}
                })
				
    			var rowOne = $("<div class='resourceColumns'></div>").appendTo(resultContainer);
    			var rowTwo = $("<div class='resourceColumns'></div>").appendTo(resultContainer);
				
				var rowCount = 0;
				var rowCountBottom = 0;
				var rowCountTop = 0;
				
				//find the center
				for (i=0; i<headingContainerArr.length; i++)
				{
					rowCountBottom += headingContainerArr[i][1];
					rowCountTop += headingContainerArr[headingContainerArr.length - i - 1][1];
					if(rowCountBottom >= (totalHeight/2)){
						rowCount = i
						break;
					}else if(rowCountTop >= (totalHeight/2)){
						rowCount = headingContainerArr.length - i - 1
						break;
					}
				}
				
				//put items into each column
				for (j=0; j<headingContainerArr.length; j++)
				{
					if(rowCount >= j){
    					headingContainerArr[j][0].appendTo(rowOne);
					} else {
    					headingContainerArr[j][0].appendTo(rowTwo);
					}
				}
				
                resultContainer.slideDown("800");
            }
            else {
                resultContainer.html("No data found");
                resultContainer.slideDown("400");
            }

        }