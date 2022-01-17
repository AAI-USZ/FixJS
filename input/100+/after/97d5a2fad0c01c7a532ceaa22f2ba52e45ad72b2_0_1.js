function addPayment(){
	var otherparty=escape(document.getElementById("otherparty").value);
	var desc=escape(document.getElementById("desc").value);
	var getorgive=escape(document.getElementById("getorgive").value);
	var amount=escape(document.getElementById("amount").value);
	var type=escape(document.getElementById("type").value);
	var day=escape(document.getElementById("day").value);
	var month=escape(document.getElementById("month").value);
	var year=escape(document.getElementById("year").value);
	var account=escape(document.getElementById("account").value);
	var accsel=escape(document.getElementById("accsel").value);
	var order=escape(document.getElementById("datesort0").checked);
	var offset=escape(document.getElementById("page").value);
	var recvalue=escape(document.getElementById("accbal").value);
	var perpage=escape(document.getElementById("numperpage").value);
	
	
	if(order===true){
		order=0;	
	}else{
		order=1;	
	}
	var repeat=document.getElementById("repeat").value;
	if(repeat==="Yes"){
		var rf=escape(document.getElementById("repeatfrequency").value);
		var rt=escape(document.getElementById("repeattimes").value);	
	}
	
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Response Text or fade out etc.
			document.getElementById("statementhold").innerHTML=xmlhttp.responseText;
			document.getElementById("otherparty").value="";
			document.getElementById("amount").value="";
			document.getElementById("desc").value="";
			document.getElementById("repeat").value="No";
			document.getElementById("repeatoptions").innerHTML="";
		}
	}
	xmlhttp.open("GET","xmlhttp/addpayment.php?o="+otherparty+"&d="+desc+"&a="+amount+"&t="+type+"&day="+day+"&month="+month+"&year="+year+"&account="+account+"&getorgive="+getorgive+"&accsel="+accsel+"&order="+order+"&rf="+rf+"&rt="+rt+"&offset="+offset+"&recvalue="+recvalue+"&perpage="+perpage,true);
	xmlhttp.send();	
}