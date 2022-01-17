function (str){
			if(this.options.showConsole){
				//fallback console for old browsers...
				if (typeof console === "undefined" || typeof console.log === "undefined" || this.options.visualConsole==true) {
					var tpl = "<div id='consolelog'></div>";
					if($("#consolelog").length == 0){
						$(tpl).appendTo('body');
						$("#consolelog").css({
							"position":"fixed",
							"width":"100%",
							"height":"100px",
							"font-size":"11px",
							"bottom":"0px",
							"left":"0px",
							"overflow":"auto",
							"z-index":"100",
							"background-color":"#fff",
							"padding":"0px",
							"border-top":"2px solid #ccc"
						});
						$('html,body').css({'margin-bottom':'100px','height':"auto"});
					}
					$("<span>"+str+"</span></br>").appendTo("#consolelog");
					$("#consolelog").scrollTop($("#consolelog").prop('scrollHeight'));
				}else{
					console.log(str);
				}
			}
		}