function(result) {
		this.update_progress(1);
		$(this.tpl_result({ apps: result })).appendTo(this.$div);
		var $cur_slide = $('.present', this.$div).addClass('fadingout')
			.next().addClass('present')
			.end()
		setTimeout(function() {
			$cur_slide.remove();
		}, 1000);
	}