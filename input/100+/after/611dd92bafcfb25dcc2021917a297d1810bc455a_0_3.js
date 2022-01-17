function(message, priority){
				this.curElCount++;
				var divId = "console_row_" + this.curElCount;
				var colors = ['#FAFAFF','#FFFFE0','#FFFAFA'];
				var txtColors = ['white','yellow','orange'];
				var imgNames = ['info','warning','error'];
				var divString = [];
				divString.push("<div id='");
				divString.push(divId);
				divString.push("' style='border-bottom: dashed #222; border-bottom-width: 1px; background-color:");
				divString.push(colors[priority]);
				divString.push("; padding: 2px;'>");
				divString.push("<table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'>");
				divString.push("<img src='images/");
				divString.push(imgNames[priority]);
				divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td>");
				divString.push("<td valign='top' style='float: left;'>");
				divString.push(message);
				divString.push("</td><td valign='top' style='width: 20px;'><div id='cCancel_");
				divString.push(this.curElCount);
				divString.push("'><img src='images/cancel.png' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table>");
				divString = divString.join("");
				$(divString).prependTo($(this.lId));
				var that = this;
				var nr = this.curElCount;
				var delId = "#cCancel_"+this.curElCount;
				$(delId).click((function(that){
					return function(){
						that.actionTaken = true;
						that.counter[priority]--;
						that.bCount[priority].remove();
						that.bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, that.counter[priority]).attr({fill: txtColors[priority]});
						that.button.push(that.bCount[priority]);
						that.mask.toFront();
						delId = "#console_row_" + nr;
						$(delId).remove();
					}
				})(this));
			}