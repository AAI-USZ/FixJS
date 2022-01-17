function clientNetMismatchQuery(expected, current, newIp)
{
	var continueFun = function(result)
	{ 
		if(result.match(/Cancel/))
		{
			window.location=window.location
		}
		else
		{
			if(result.match(/Change/))
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
	query("Client Subnet Mismatch", "The OpenVPN expects your router to have a subnet of " + expected + "but your router is configured with a subnet of " + current + ".  Do you want to...", 
		[ "Switch Router to expected subnet, with IP " + newIP, "Keep Current Subnet and Continue", "Cancel"], continueFun );

}