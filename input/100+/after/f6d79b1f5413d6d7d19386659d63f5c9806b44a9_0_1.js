function fnBuilderDrawCallback(oSettings, json) {
                var wrapperDiv,
                    markerDiv,
                    $td,
                    aData,
                    elements,
                    i, length, temp,
                    $cursorRows,
                    $table = $(this),
                    $parent = $table.parent(),
                    $tr,
                    //use this array to cache DOM heights then we can detach the table to manipulate it to increase speed.
                    heights = [];
                
                clearTimeout(mod.timeout);
                
                //only create the cursor arrows if the library is on the page.
                if ($lib.length > 0 && $lib.filter(":visible").length > 0) {

                    $cursorRows = $sbTable.find("tbody tr.sb-future.sb-allowed:not(.sb-header, .sb-empty)");
                    
                    //need to get heights of tds while elements are still in the DOM.
                    for (i = 0, length = $cursorRows.length; i < length; i++) {
                        $td = $($cursorRows.get(i)).find("td:first");
                        heights.push($td.height());
                    }
                    
                    //detach the table to increase speed.
                    $table.detach();
                    
                    for (i = 0, length = $cursorRows.length; i < length; i++) {
                        
                        $td = $($cursorRows.get(i)).find("td:first");
                        if ($td.hasClass("dataTables_empty")) {
                            $parent.append($table);
                            return false;
                        }
                        
                        wrapperDiv = $("<div />", {
                            "class": "innerWrapper",
                            "css": {
                                "height": heights[i]
                            }
                        });
                        markerDiv = $("<div />", {
                            "class": "marker"
                        });
                        
                        $td.append(markerDiv).wrapInner(wrapperDiv);
                        
                    }
                    
                    //re-highlight selected cursors before draw took place
                    for (i = 0; i < cursorIds.length; i++) {
                        if (headerFooter[i] == "f") {
                            $tr = $table.find("tbody tr.sb-footer[id="+cursorIds[i]+"][si_id="+showInstanceIds[i]+"]");
                        } else {
                            $tr = $table.find("tr[id="+cursorIds[i]+"][si_id="+showInstanceIds[i]+"]");
                        }
						
                        /* If the currently playing track's cursor is selected, 
                         * and that track is deleted, the cursor position becomes
                         * unavailble. We have to check the position is available
                         * before re-highlighting it.
                         */
                        if ($tr.find(".sb-checkbox").children().hasClass("innerWrapper")) {
                            mod.selectCursor($tr);
                            
                        /* If the selected cursor is the footer row we need to
                         * explicitly select it because that row does not have
                         * innerWrapper class
                         */     
                        } else if ($tr.hasClass("sb-footer")) {
                            mod.selectCursor($tr);	
                        }
                    }
                    
                    //if there is only 1 cursor on the page highlight it by default.
                    if ($cursorRows.length === 1) {
                        $td = $cursorRows.find("td:first");
                        if (!$td.hasClass("dataTables_empty")) {
                            $cursorRows.addClass("cursor-selected-row");
                        }
                    }
                    
                    $parent.append($table);
                }
                
                //order of importance of elements for setting the next timeout.
                elements = [
                    $sbTable.find("tr."+NOW_PLAYING_CLASS),
                    $sbTable.find("tbody").find("tr.sb-future.sb-footer, tr.sb-future.sb-header").filter(":first")
                ];
                
                //check which element we should set a timeout relative to.
                for (i = 0, length = elements.length; i < length; i++) {
                    temp = elements[i];
                    
                    if (temp.length > 0) {
                        aData = temp.data("aData");
                        // max time interval
						// setTimeout allows only up to (2^31)-1 millisecs timeout value
						maxRefreshInterval = Math.pow(2, 31) - 1;
						refreshInterval = aData.refresh * 1000;
						if(refreshInterval > maxRefreshInterval){
							refreshInterval = maxRefreshInterval;
						}
						mod.timeout = setTimeout(mod.refresh, refreshInterval); //need refresh in milliseconds
                        break;
                    }
                }
                
                mod.checkToolBarIcons();
            }