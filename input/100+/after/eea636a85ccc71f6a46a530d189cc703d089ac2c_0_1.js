function(message, priority){
				curElCount++;
				var divId = "console_row_" + curElCount;
				var divString = [];
				divString.push("<div id='");
				divString.push(divId);
				divString.push("' class='console_row priority");
				divString.push(priority);
				divString.push("' style='border-bottom: dashed #222; border-bottom-width: 1px; background-color:");
				divString.push(colors[priority]);
				if(!state[priority]){
					divString.push("; display: none")
				}
				divString.push(";'><table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'><img src='images/");
				divString.push(imgNames[priority]);
				divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td><td valign='top' style='float: left;'>");
				divString.push(message);
				divString.push("</td><td valign='top' style='width: 20px;'><div id='cCheck_");
				divString.push(curElCount);
				divString.push("'><form><input type='checkbox' class='cCheck'/></form></div></td><td valign='top' style='width: 20px;'><div id='cCancel_");
				divString.push(curElCount);
				divString.push("' style='cursor: pointer;'><img src='images/cancel.png' title='usuń komunikat' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table>");
				divString = divString.join("");
				$(divString).prependTo($(eId));
				var delId = "#cCancel_"+curElCount;
				var checkId = "#cCheck_"+curElCount;
				var nr = curElCount;
				$(delId).click(function(){
					actionTaken = true;
					counter[priority]--;
					redrawCounter(priority);
					delId = "#console_row_"+nr;
					$(delId).remove();
				});
				$(checkId).click(function(){
					actionTaken = true;
				});
			}