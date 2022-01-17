function (data) {
	resultData = eval(data);
	//console.log(resultData);
	wycFun.fillColorHtmlByData(resultData[0],$("#diskinfo01")[0],0);
}