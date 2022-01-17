function (element){
	var selectedColor ; 
	var gridPicker = $("<div/>",{
		id : "gridColorPicker"
	}).appendTo($("body"));
	
	var left = element.offset().left+20;
	var top = element.offset().top+20;
	var divPadding = 10;
	
	gridPicker.css({
		"padding" : divPadding + "px",
		"position" : "absolute",
		"max-width" : "180px",
		"left" : left+"px",
		"top" : top+"px",
		"z-index" : 1000,
		"cursor" : "auto",
		"background-color" : "#FFFFFF",
		"-moz-box-shadow" : "0 0 10px #000000",
   		"-webkit-box-shadow" : "0 0 10px #000000",
   		"box-shadow" :  "0 0 10px #000000",
   		"filter": "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)",
   		"-ms-filter": "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)"
	});
	
	(function insertFirstRowColors(){
		
		var rowColors = ["rgb(0,0,0)","rgb(67,67,67)","rgb(102,102,102)","rgb(153,153,153)","rgb(183,183,183)","rgb(204,204,204)","rgb(217,217,217)","rgb(239,239,239)","rgb(243,243,243)","rgb(255,255,255)"];
		var rowDiv = $("<div/>",{"id":"firstRowColors"}).appendTo(gridPicker);
		rowDiv.css({"margin":"5px 0px 5px 0px"});
		insertColors(rowColors , rowDiv);
	
	})();
	
	(function insertSecondRowColors(){
		
		var rowColors = ["rgb(152,0,0)","rgb(255,0,0)","rgb(255,153,0)","rgb(255,255,0)","rgb(0,255,0)","rgb(0,255,255)","rgb(74,134,232)","rgb(0,0,255)","rgb(153,0,255)","rgb(255,0,255)"];
		var rowDiv = $("<div/>",{"id":"secondRowColors"}).appendTo(gridPicker);
		rowDiv.css({"margin":"5px 0px 5px 0px"});
		insertColors(rowColors , rowDiv);
	
	})();
	
	(function insertGridColors(){
		
		var rowColors = ["rgb(230,184,175)","rgb(244,204,204)","rgb(252,229,205)","rgb(255,242,204)","rgb(217,234,211)","rgb(208,224,227)","rgb(201,218,248)","rgb(207,226,243)","rgb(217,210,233)","rgb(234,209,220)",
						 "rgb(221,126,107)","rgb(234,153,153)","rgb(249,203,156)","rgb(255,229,153)","rgb(182,215,168)","rgb(162,196,201)","rgb(164,194,244)","rgb(159,197,232)","rgb(180,167,214)","rgb(213,166,189)",
						 "rgb(204,65,37)","rgb(224,102,102)","rgb(246,178,107)","rgb(255,217,102)","rgb(147,196,125)","rgb(118,165,175)","rgb(109,158,235)","rgb(111,168,220)","rgb(142,124,195)","rgb(194,123,160)",
						 "rgb(166,28,0)","rgb(204,0,0)","rgb(230,145,56)","rgb(241,194,50)","rgb(106,168,79)","rgb(69,129,142)","rgb(60,120,216)","rgb(61,133,198)","rgb(103,78,167)","rgb(166,77,121)",
						 "rgb(133,32,12)","rgb(153,0,0)","rgb(180,95,6)","rgb(191,144,0)","rgb(56,118,29)","rgb(19,79,92)","rgb(17,85,204)","rgb(11,83,148)","rgb(53,28,117)","rgb(116,27,71)",
						 "rgb(91,15,0)","rgb(102,0,0)","rgb(120,63,4)","rgb(127,96,0)","rgb(39,78,19)","rgb(12,52,61)","rgb(28,69,135)","rgb(7,55,99)","rgb(32,18,77)","rgb(76,17,48)"];
		
		var rowDiv = $("<div/>",{"id":"secondRowColors"}).appendTo(gridPicker);
		rowDiv.css({"margin":"5px 0px 5px 0px"});
		insertColors(rowColors , rowDiv);
	
	})();
	
	(function insertCustomColorsRow(){
		
		var customDiv = $("<div/>",{ html : "Custom..." }).appendTo(gridPicker);
		customDiv.css({"padding":"5px 0 5px 0" , "font":"normal 13px arial,sans-serif"} );
		customDiv.on("mouseover",function(){ 
			$(this).css( { "background-color":"rgb(239,239,239)" });
		});
		customDiv.on("mouseout",function(){ 
			$(this).css( { "background-color":"rgb(255,255,255)" });
		});
		
		var rowColors = ["rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)","rgb(255,255,255)"]
		var rowDiv = $("<div/>",{"id":"customRowColors"}).appendTo(gridPicker);
		rowDiv.css({"margin":"5px 0px 5px 0px"});
		insertColors(rowColors , rowDiv);
		
		$.each($("#customRowColors > div") , function(index,color){
			$(color).css({"border-color":"#CCCCCC"});
			$(color).unbind('mouseout mouseover');
		});
	
	});
	
	function insertColors(rowColors , rowDiv){
		$.each(rowColors , function (index, color){
			
			var colorDiv = $("<div/>",{			
			}).appendTo(rowDiv);
			colorDiv.mouseover(function(){
				colorDiv.css({
					"border-color" : "#000000"
				});
			});
			colorDiv.mouseout(function(){
				colorDiv.css({
					"border-color" : "#FFFFFF"
				});
			});
			colorDiv.css({
				"border" : "1px solid",
				"border-color" : "#FFFFFF",
				"background-color" : color,
				"min-width" : "16px",
				"min-height": "16px",
				"display" : "inline-block"
			});
			colorDiv.on('click',function(){
				selectedColor = $(this).css("background-color");
				gridPicker.hide();
			});
		});
	}
	
	/* Lets re-define the click event to toggle the visiblity of color Picker */
	element.unbind('click');
	$(element).click(function(event){
			gridPicker.toggle();
	});
	
	/* If color picker is visible , then clicking anywhere on the body except 'color' div should hide the picker.
	 *  'color' div has its own even handler define above to control visibility of picker */
	$("body").click(function(event){
			if(event.target.id !== 'color'){
				gridPicker.is(":visible") ? gridPicker.hide() : "";
			}
		
	});
	
	/* I dont want any ancestor of gridPicker to do anything when mouse is clicked anywhere on gridPicker */
	gridPicker.click(function(event){
		event.stopPropagation();
	});	
 
   function getSelectedColor(){
   		return selectedColor;
   }
   return {
   		"getSelectedColor" : getSelectedColor
   }
}