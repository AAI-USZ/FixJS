function (data) {
				var getData = eval(data);
				if(getData.result.process<=100&&getData.result.process>=0){
				checkLoading.css('width',getData.result.process+'%');
				timeNum =setTimeout(timeSet,1000);
				}else{
				clearTime(timeNum);
				}
			}