function(i,item){
					tabLists.add(item);
					ti += '<li id="list_'+item.id+'" class="mtt-tab'+(item.hidden?' mtt-tabs-hidden':'')+'">'+
						'<a href="#list/'+item.id+'" title="'+item.name+'"><span>'+item.name+'</span>'+
						'<div class="list-action"></div></a></li>';
				}