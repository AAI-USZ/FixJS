function(count) {
	self.port.emit("log", "AttachCSS started");
  bod = $("body#something_awful");
	css = $("link[rel=stylesheet][href$='globalcss/globalmenu.css']");
	if (css.size() === 0) {
		css = $("link[rel=stylesheet][href='/aw/css/core.min.css']");
	}
	if (bod.size() > 0) {
    css = $("link[rel=stylesheet][href$='globalcss/globalmenu.css']");
    if (css.size() === 0) {
      css = $("link[rel=stylesheet][href='/aw/css/core.min.css']");
    }
		// Attach a bit of CSS that makes things look good before the script finishes
    fastCSS = document.createElement("style");
    fastCSS.setAttribute("type", "text/css");
    fastCSS.textContent = "body > #globalmenu { margin: 0 auto !important; } #content > div.pages, #content > #ac_timemachine { display: none; }";
    document.head.appendChild(fastCSS);
		// And attach the main fancy.css
    fancyCSS = document.createElement("link");
    fancyCSS.setAttribute("href", fancySAForums.browser.getURL("/css/fancy.css"));
    fancyCSS.setAttribute("type", "text/css");
    fancyCSS.setAttribute("rel", "stylesheet");
    $(css).after(fancyCSS);
    // Attempt to attach forum specific css
		fancySAForums.AttachCSS();
	} else {
		if (count < 1000) {
			window.setTimeout(function() {
				fancySAHelper.AttachCSS(count+1);
			}, 10);
		}
	}
  }