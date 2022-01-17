function(starting) {
		var question = this.candidate_questions.shift();
		console.log(question);
		$(this.tpl_question({ question: question })).appendTo(this.$div);
		var $cur_slide = $('.present', this.$div).addClass('fadingout')
			.next().addClass('present')
			.end();
		if (starting) this.$start_slide = $cur_slide.removeClass('present').removeClass('fadingout');
		setTimeout(function() {
			$cur_slide.remove();
		}, 1000);
	}