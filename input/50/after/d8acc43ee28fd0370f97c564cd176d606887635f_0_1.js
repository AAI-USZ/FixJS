function() {
			if (starting) this.$start_slide = $cur_slide.removeClass('present').removeClass('fadingout');
			$cur_slide.remove();
		}