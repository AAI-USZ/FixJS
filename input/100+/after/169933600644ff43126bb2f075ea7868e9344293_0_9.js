function(){
			var html = this.template.call(this, this.collection);
			var ph = this.$el.find('.log-content').css({opacity: 0}).html(html);
			var targetH = ph.height() - 50;
			this.$el.animate({height: '+=' + targetH}, 800, updatePos);
			ph.animate({opacity: 1}, 800);
			this.loader.destroyAll();
			return this;
		}