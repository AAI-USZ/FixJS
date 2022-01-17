function updateRow(){
	objtb=document.getElementById("electricList");
	var beginDegree=0;
	var endDegree=0;
	var price = 0;
	var totalMoney=0;
	var totalDegree=0;
	var arrTR=objtb.getElementsByTagName("tr");
	for(x=1;x<arrTR.length-1;x++){
		endDegree=parseFloat(arrTR[x].getElementsByTagName("td")[2].getElementsByTagName("input")[0].value);
		beginDegree=parseFloat(arrTR[x].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value);
		totalDegree += endDegree-beginDegree;
		price=parseFloat(arrTR[x].getElementsByTagName("td")[3].getElementsByTagName("input")[0].value);
		totalMoney +=(endDegree-beginDegree) * price;
	}
	document.getElementById("totalDegree").innerHTML=""+totalDegree.toFixed(2);
	document.getElementById("totalMoney").innerHTML=""+totalMoney.toFixed(2);
}