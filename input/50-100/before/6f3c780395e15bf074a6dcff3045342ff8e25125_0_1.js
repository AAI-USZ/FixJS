function (e) {
            var $this = $(this);
	    var $tip = $this.find('.tip');
            $this.children('.arrow, .tip')
                .animate({'opacity': 0}, 300, function () {
					$tip.css({'left': -999, 'top': 0})
                });
            $this.children('.callout')
                .animate({'opacity': 1}, 300);
        }