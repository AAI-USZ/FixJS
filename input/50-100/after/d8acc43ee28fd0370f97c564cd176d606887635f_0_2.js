function(result) {
		this.update_progress(1);
		var $next_slide = $(this.tpl_result({ apps: result })).appendTo(this.$div);
		var $cur_slide = $('.present', this.$div).addClass('fadingout')
		setTimeout(function(){
			$next_slide.addClass('present');
		}, 100);
		setTimeout(function() {
			$cur_slide.remove();
		}, 1000);
	}