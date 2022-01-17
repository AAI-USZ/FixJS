function(page) {
			if(page == "" ^ page == "play") {
				this.selectTab("play");
				$.lang.init(function() {
					$.page.play();
				});
			} else if(page == "tutorial") {
				this.selectTab(page);
				$.lang.init(function() {
					$.page.tutorial();
				});
			} else if(page == "about") {
				this.selectTab(page);
				$.lang.init(function() {
					$.page.about();
				});
			} else if(page == "credits") {
				this.selectTab(page);
				$.lang.init(function() {
					$.page.credits();
				});
			}
		}