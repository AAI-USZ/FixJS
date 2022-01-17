function (key, val) {
                        if (filtertype == val["type"]) {
                            if (!headingContainer) {
                                headingContainer = $("<div class='resourceGroup'></div>");
                                headingContainer.append("<h2>" + filtername + "</h2>");
                            }
							groupHeight += 1;
                            var resourceItem = $("<div class='resourceItem'><h3>" + val["name"] + "</h3><a href='" + cleanURLLink(val["url"]) + "'><strong>website:</strong>" + cleanURLView(val["url"]) + "</a></br>short description about the resource here</div>").appendTo(headingContainer);
							resourceItem.children("a").click(function(){recordOutboundLink(this,'Resource',val["type"] + " - " + val["name"]); return false;});
						}
                    }