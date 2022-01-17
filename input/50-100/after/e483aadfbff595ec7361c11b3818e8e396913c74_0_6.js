function() {
				var $this = $(this);
				$this.siblings().removeClass("selected");
				$this.addClass("selected");
				$this.find("input")[0].checked = true; 
				if (callback) {
					callback.call(callback, $this.find("input"));
				}
				$this = null;
			}