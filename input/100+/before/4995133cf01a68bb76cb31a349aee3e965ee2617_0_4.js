function(){//检查磁盘的操作
	var checkLoading = $('#checkLoading');
	checkLoading.css('width',"1%");
	var dataIndex = $("#diskOperate").attr('diskdata');
	var timeNum = null;
	function timeSet(){
		$.get(requestURL.disk_part_check, {
				dev : dataIndex.dev,
				num : dataIndex.num,
			},
				function (data) {
				var getData = eval(data);
				if(getData.result.process<=100&&getData.result.process>=0){
				checkLoading.css('width',getData.result.process+'%');
				timeNum =setTimeout(timeSet,1000);
				}else{
				clearTime(timeNum);
				}
			}, "json");
	}
	timeSet();
			$( "#diskCheckMess" ).dialog("open");
}