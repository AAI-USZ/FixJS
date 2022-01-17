function init(){
			var $elem = $("#"+this.id),
				that = this;
			
			if(!(this.width && this.height)){
				this.width = parseInt($elem.css("width"), 10) || 950;
				this.height = parseInt($elem.css("height"), 10) || 650;
			}
			var heightOfTopBar = 20;

			var html = [],
				h = (this.height-2-heightOfTopBar),
				canvas_width = (Math.floor(this.width * .7)),
				left_plugins_width = (Math.floor(this.width * .15))
			;
			html.push("<div id='top_nav_"+pf+"' style='width: "+(this.width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp;&gt; <span> </span></div>");
			html.push("<div id='left_plugins_"+pf+"' style='width:"+left_plugins_width+"px; height:"+h+"px; float:left;border:1px solid black;'></div>");
			html.push("<div id='canvas_holder_"+pf+"' style='width:"+canvas_width+"px; height:"+h+"px; float:left;border:1px solid black; overflow: hidden; '>");
			html.push("<div id='console_"+pf+"' style='width:"+canvas_width+"px; height: 0px; float:left;'></div>");
			html.push("<div id='canvas_"+pf+"' style='width:"+canvas_width+"px; height:"+h+"px; float:left; '></div></div>");
			html.push("<div id='right_plugins_"+pf+"' style='width:"+(this.width-6-canvas_width-left_plugins_width)+"px; height:" + h + "px; float:left;border:1px solid black; '></div>");

			$elem.html(html.join(""));

			this.paper = Raphael("canvas_"+pf, canvas_width, h);
			// this.leftPlugins = Raphael("left_plugins_"+pf, left_plugins_width, h);
			this.bgSelectionHelper = this.paper.rect(0,0,width,height).attr({fill : "#DEDEDE", stroke: "none"}).toBack();
	
			$elem.css("width", this.width);
			$elem.css("height", this.height);

			//zbieranie danych o położeniu
			var $column = $("#canvas_holder_"+pf),
				position = $column.position();
			this.columnParams.centerCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#left_plugins_"+pf)
			position = $column.position();
			this.columnParams.leftCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};
			
			$column = $("#right_plugins_"+pf);
			position = $column.position();
			this.columnParams.rightCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#top_nav_"+pf)
			position = $column.position();
			this.columnParams.top_nav = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};
	
			//obsługa formularza, rzeczy z JQuery UI - to tutaj??? czy w controler.js???
			$("#form").dialog({
				autoOpen: false,
				modal: true,
				height: 500,
				width: 800
			});
			$( "#tabs" ).tabs();
			$("#functional1")
				.accordion({ 
					collapsible: true,
					header: "h3" 
			});
			$("#functional2")
				.accordion({ 
					collapsible: true,
					header: "h3" 
			});
		}