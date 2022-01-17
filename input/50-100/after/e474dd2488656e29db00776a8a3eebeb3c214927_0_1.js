function(e) {
			e.preventDefault();
			showHiddenImages = !showHiddenImages;
			$(this).find("span.showHide").html(!document.styleSheets[0].disabled ? "Hide" : "Show");
			document.styleSheets[0].disabled = !document.styleSheets[0].disabled;
			return false;
		}