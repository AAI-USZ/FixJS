function timeSet(){
	var dataIndex = $(".j_diskOperate")[wycVal.clickNum].getAttribute('diskdata');
	dataIndex = eval(dataIndex);
		$.get(requestURL.disk_part_check, {
				dev : dataIndex.dev,
				num : dataIndex.num,
			},
				function (data) {
				var getData = eval(data);
				if(getData.result.process<=100&&getData.result.process>=0){
				checkLoading.css('width',getData.result.process+'%');
				wycVal.timeNum =setTimeout(timeSet,1000);
				}else if(getData.result.process==100){
				clearTimeout(wycVal.timeNum);
				//wycFun.initFun();
				$( "#diskCheckMess" ).dialog("close");
				}
			}, "json");
	}