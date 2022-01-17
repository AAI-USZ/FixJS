function()
		{
			this.header.thead = [];

			for(var i = -1, l = this.header.summary.length; ++i < l;)
			{
				this.header.thead.push(this.header.summary[i]['name']);
			}
			
			var data = {
				header: this.header
			};

			var _html = tContent(data),
				self  = this;

			this.overlay = new Overlay();

			this.$el.find('div.pane-content').html(_html);

			this.$el.nanoScroller({
					paneClass: 'track',
					contentClass: '.pane-content'
				});

			this.overlay.show();

			$('#ref-popin')
				.addClass('active')
				.find('div.close')
					.click(function()
					{
						$('#ref-popin').removeClass('active');
						self.overlay.hide();			
					});
			
			return this;
		}