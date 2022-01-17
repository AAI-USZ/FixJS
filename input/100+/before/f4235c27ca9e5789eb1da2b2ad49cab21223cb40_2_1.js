function (result, status, XMLHttpRequest)
			{
				console.debug("viewLoad success ",view);
				
				//clear/unbind old stuff
				$("#"+view.id).unbind();
				$("#"+view.id).empty();
								
				//just set innerHTML, without having jquery executing the scripts:
				document.getElementById(view.id).innerHTML=result;				
				//eval the scripts in the current context. 
				//the scripts may use the our view-variable as well:
				eval($("#"+view.id+" script").text());
				
			}