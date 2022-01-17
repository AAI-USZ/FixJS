function (data) {
				var getData = eval(data);
				if(getData.result.process<=100&&getData.result.process>=0){
				checkLoading.css('width',getData.result.process+'%');
				wycVal.timeNum =setTimeout(timeSet,1000);
				}else{
				clearTimeout(wycVal.timeNum);
				wycFun.btnMess(okBtn,'返回数据错误:'+getData.result.process,width,height);
				
				}
			}