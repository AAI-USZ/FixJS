function() {
			$('.bubble_container').addClass('above_welcome_overlay');
			this.$el.html(this.template({}));
			setTimeout(_.bind(this.done, this), 5000);
			return this;
		}