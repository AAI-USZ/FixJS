function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Response Text or fade out etc.
			document.getElementById("statementhold").innerHTML=xmlhttp.responseText;
			document.getElementById("otherparty").value="";
			document.getElementById("amount").value="";
			document.getElementById("desc").value="";
		}
	}