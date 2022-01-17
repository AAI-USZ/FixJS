function(i,item){
                    if (item.id == -1) {
                        tabLists.get(-1).sort = item.sort;
                        tabLists.get(-1).notesExpanded = item.notesExpanded;
                        tabLists.get(-1).showCompleted = item.showCompleted;
                        tabLists.get(-1).showMetadata = item.showMetadata;
                    } else {
                        tabLists.add(item);
                        ti += '<li id="list_'+item.id+'" class="mtt-tab'+(item.hidden?' mtt-tabs-hidden':'')+'">'+
                            '<a href="#list/'+item.id+'" title="'+item.name+'"><span>'+item.name+'</span>'+
                            '<div class="list-action"></div></a></li>';
                    }
				}