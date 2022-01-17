function(datas,rightData,titles,width,height){	
				var getData = eval(datas);
				var okBtn = $("#okbtn");
				
				switch (getData.result.result) {
				case 'ok':
						okBtn.html('<p class="marginAuto"><strong>'+titles[0]+'</strong></p>')
					okBtn.dialog({ //弹出完成的按钮
						autoOpen : false,
						title : titles[0],
						modal : true,
						width:width,
						height:height,
						minWidth:100,
						minHeight:100,
						buttons : {
							"确认" : function () {
								$(this).dialog("close");
							}
						}
					});
					okBtn.dialog("open");
					break;
				default:
					okBtn.dialog({ //弹出完成的按钮
						autoOpen : false,
						title : title[1],
						modal : true,
						width:width,
						height:height,
						minWidth:100,
						minHeight:100,
						buttons : {
							"确认" : function () {
								$(this).dialog("close");
							}
						}
					});
					okBtn.dialog("open");
					break;
				}
	}