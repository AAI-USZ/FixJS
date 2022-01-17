function(){
				var args = arguments;
				//prepare page
				page.prepare.apply(page, args);
				_.each(page.blocks, function(block){
					//prepare block
					if(block.prepare) { block.prepare.apply(block, args)};
				});
				page.render();
				//Load page
				page.load($(self.containerEl));
				// FIRST TIME |OR| Different page
				//if(!self.currentPage || (self.currentPage && self.currentPage.name != page.name)) {
					self._jQChangePage(page);
				//} 
				self.currentPage = page;
			}