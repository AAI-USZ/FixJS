function(savedFile) {
			var sel = $("#fileList");
			$(sel).empty();
			this.addScriptsToList(defaults);
		
			var userScripts = localStorage.getObject("scripts")
		
			var sel=$("#fileList");
			var opt = $("<li>");
			$(opt).text("USER SCRIPTS");
			$(opt).css({
				"padding-left": ".5em", 
				"font-weight" : "bold",
				"margin": "1em 0",
				"background-color": "#fff",
				"color": "#000",
				"text-align": "left", 
			});
			$(sel).append(opt);
		
			this.addScriptsToList(userScripts);
		}