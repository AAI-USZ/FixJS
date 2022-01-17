function(choice, desc){
				//add checkbox
				var checkbox=$("<input>")
						.attr("value",choice)
						.attr("type","checkbox")
						.attr("id",keyStr+"."+choice);
						
				checkbox.attr("checked", meta.default.indexOf(choice) != -1);
				addedElement.append(checkbox);
				
				//add description
				addedElement.append(
					$("<label>")
						.attr("for",keyStr+"."+choice)
						.text(desc)
				);
				
				//add break
				addedElement.append($("<br>"));

			}