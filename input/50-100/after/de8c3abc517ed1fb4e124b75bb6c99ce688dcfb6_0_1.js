function(result)
	{ 
		if(result.match(/Cancel/))
		{
			window.location=window.location
		}
		else
		{
			if(result.match(/Switch/))
			{
				document.getElementById("net_mismatch_action").value = "change"
			}
			if(result.match(/Keep/))
			{
				document.getElementById("net_mismatch_action").value = "keep"
			}
			document.getElementById("openvpn_client_form").submit();
		}
	}