function(starting) {
		var question = this.candidate_questions.shift();
		var $next_slide = $(this.tpl_question({ question: question })).appendTo(this.$div);
		var $cur_slide = $('.present', this.$div).addClass('fadingout');
		setTimeout(function(){
			$next_slide.addClass('present');
		}, 100);
		setTimeout(function() {
			if (starting) this.$start_slide = $cur_slide.removeClass('present').removeClass('fadingout');
			$cur_slide.remove();
		}, 1000);
	}