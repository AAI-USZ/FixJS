function(state) {
		$("#"+this.name+"MenuButton").button('toggle');
		if (state==="last")
			state = FlxState.getState(this.name);
		that = this;
		var nextAppId = this.name + "-app",
			nextAppDiv = $("#"+nextAppId);
		var noApp = $(".application").length==0;
		var appChanged = $(".application").length>0
			&& $(".application.active").length>0
			&& $(".application.active").attr("id")!=nextAppId;
		if ( noApp || appChanged) {
			if (typeof(App.activeApp)!="undefined")
				App.activeApp.destroy();
			if (appChanged) {
				var currentAppDiv = $(".application.active");
				currentAppDiv.removeClass("active");
				currentAppDiv.addClass("dormant");
			}
			if (nextAppDiv.length==0) {
				require([ "text!applications/"+ this.name + "/template.html"], function(html) {
					html = "<div class=\"application active\" id=\"" + nextAppId + "\">"
						 + html + "</div>";
					
					$("#applications").append(html);
					
					App.activeApp = App.apps[that.name];
					App.activeApp.renderState(state, true);
					App.activeApp.setup();
				});
			} else {
				nextAppDiv.removeClass("dormant");
				nextAppDiv.addClass("active");
			}
		} else {
			this.renderState(state, true);
		}
	}