function (data) {
	resultData = eval(data);
	//console.log(resultData);
	var diskDom = $('#diskList'),htmlDiv='';
	for(var i = 0; i <resultData.length;i++){
	//var diskDom = $(diskDoms[i]);
	htmlDiv +='<div class="j_disk clearfix disk" clickNum = "'+i+'">';
	var htmlDiv_temp = wycFun.fillColorHtmlByData(resultData[i],i);
	htmlDiv += wycFun.initFillDiskInfor(htmlDiv_temp,resultData[i]);
	console.log(htmlDiv);
	htmlDiv +='</div>';
	
	}
	
	diskDom.html(htmlDiv);
}