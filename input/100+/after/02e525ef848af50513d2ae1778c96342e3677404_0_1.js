function (e) {
            var $this = $(this);
            var $tip = $this.find('.tip');
            var left = parseInt($tip.data("left"), 10);
            var top = parseInt($tip.data("top"), 10);
            $tip.css({'left': left, 'top': top})
                .animate({'opacity': 1}, 300);
            $this.children('.arrow')
                .animate({'opacity': 1}, 300);
            $this.children('.callout')
                .animate({'opacity': 0}, 300);
        }