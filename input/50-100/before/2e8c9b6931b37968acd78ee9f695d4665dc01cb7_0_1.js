function(blockKey) {
			var block = self.blocks[blockKey];
			if(block.model==undefined) {
				block.model = {};
			}
			_.extend(block.model, block.page.model);
			//_.extend(block.page.model, block.model);
			block.render();
			console.log(self.name + ": EL: ", block.el);
			$(self.el).append(block.el);
		}