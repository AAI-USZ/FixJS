function(datas,rightData,titles,width,height){	
				var getData = eval(datas);
				var okBtn = $("#okbtn");
				
				switch (getData.result.result) {
				case 'ok':
					this.btnMess(okBtn,titles[0],width,height);
					break;
				default:
					this.btnMess(okBtn,titles[1],width,height);
					break;
				}
	}