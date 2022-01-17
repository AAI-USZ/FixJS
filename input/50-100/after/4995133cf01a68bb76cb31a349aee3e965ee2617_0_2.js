function(j_btn,title,width,height){
		j_btn.html('<p class="marginAuto"><strong>'+title+'</strong></p>')
					j_btn.dialog({ //弹出窗口
						autoOpen : false,
						title : title,
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
					j_btn.dialog("open");
	}