function() {
				this.model = window.tc.routers.workspaceRouter.ticker;
				
				$("a[href]").on("click", function(e){				
					navigate(e);					
					e.preventDefault();//don't let the original href continue with navigation
		        	e.stopPropagation();
					return false;
				});
									
			}