function doEdit(id){
	var otherparty=document.getElementById("otherparty"+id).value;
	var desc=document.getElementById("desc"+id).value;
	var income=document.getElementById("in"+id).value;
	var out=document.getElementById("out"+id).value;
	var type=document.getElementById("type"+id).value;
	var day=document.getElementById("day"+id).value;
	var month=document.getElementById("month"+id).value;
	var year=document.getElementById("year"+id).value;
	var account=document.getElementById("account"+id).value;

	var amount=income-out;
	
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Response Text or fade out etc.
			var trid="payment"+id;
			document.getElementById(trid).innerHTML=xmlhttp.responseText;
			updateTotal();
		}
	}
	
	xmlhttp.open("GET","doedit.php?id="+id+"&o="+otherparty+"&d="+desc+"&a="+amount+"&t="+type+"&day="+day+"&month="+month+"&year="+year+"&account="+account,true);
	xmlhttp.send();
}