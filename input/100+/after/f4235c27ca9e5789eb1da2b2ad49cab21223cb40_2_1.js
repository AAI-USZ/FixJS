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
				try
				{
					eval($("#"+view.id+" script").text());
				}
				catch(e)
				{
					//is there anyway to give the developer more info about where it was thrown exactly??
					console.debug("Following code throwed an exception somewhere:");
					console.debug($("#"+view.id+" script").text());

					throw(e);
				}
				
			}