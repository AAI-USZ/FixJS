function(listId){ //iterate on checklists
			var list=_.find(board.checklists,function(check){ //Find list
				return check.id==listId;
				});
			if(!list){
				console.log("ERROR:"+listId+" not found");
				return;
			}
			list.doneNumber=0;
			list.totalNumber=list.checkItems.length || 0;
			_.each(list.checkItems,function(item){ //Check complete
				item.complete=_.find(card.checkItemStates, function(state){
					if (state.idCheckItem==item.id&&state.state=="complete")
					{
						list.doneNumber++;
						return true;
					}
					return false;
				});
			});
			list.done=(list.doneNumber==list.totalNumber);
			var template="<div><b>{{name}}</b> <span class='show right {{#done}}green{{/done}}'>{{doneNumber}}/{{totalNumber}}</span></div><ul>{{#checkItems}}<li>{{#complete}}<del>{{/complete}}{{name}}{{#complete}}</del>{{/complete}}</li>{{/checkItems}}</ul>";
			var str=Mustache.render(template,list);

			card.checklist=card.checklist||[]; //Make array
			card.checklist.push(str);
		}