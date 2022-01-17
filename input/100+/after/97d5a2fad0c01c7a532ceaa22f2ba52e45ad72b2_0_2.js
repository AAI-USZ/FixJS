function showStatement(account, order, perpage, offset){
	var value=escape(document.getElementById("accbal").value);
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Response Text or fade out etc.
			document.getElementById("statementhold").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","xmlhttp/showaccount.php?account="+account+"&order="+order+"&perpage="+perpage+"&offset="+offset+"&value="+value,true);
	xmlhttp.send();	
}