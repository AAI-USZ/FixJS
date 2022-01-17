function() {
            		$this.UIHandleTouchState();
					if ($.UINavigationEvent) {
						return;
					} else {
						$.UINavigationEnabled = true;
						$.UINavigationEvent = false;
						navigateList($this);
						$.UINavigationEvent = true;
					}
				}