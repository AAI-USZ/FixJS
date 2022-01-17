function(){
				var args = arguments;
				//prepare page
				var allowed = false;
				allowed = page.prepare.apply(page, args);
				//exit function
				if(!allowed) { return; }
				_.each(page.blocks, function(block){
					//prepare block
					if(block.prepare) {
						allowed = block.prepare.apply(block, args);
						//break loop
						if(!allowed) { return; }
					};
				});
				//exit function.
				if(!allowed) { return; }
				
				page.render();
				//Load page
				page.load($(self.containerEl));
				// FIRST TIME |OR| Different page
				//if(!self.currentPage || (self.currentPage && self.currentPage.name != page.name)) {
					self._jQChangePage(page);
				//}
				self.currentPage = page;
				$(page.el).trigger('jui-pageloaded');
			}