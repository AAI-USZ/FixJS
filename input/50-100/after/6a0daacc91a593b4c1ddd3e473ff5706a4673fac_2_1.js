function(data){
			$.unblockUI();
			var ifr = document.createElement("IFRAME");  
			document.body.appendChild(ifr);  
			ifr.src = data.download_link; 
		}