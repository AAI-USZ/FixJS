function() {

                self.removeClass(className + '-up');

                self.removeClass(className + '-down');

                self.removeClass(className + '-left');

                self.removeClass(className + '-right');

                self.setStyles({top: null, left: null});

                arrowNode.removeClass('tooltip-arrow-up');

                arrowNode.removeClass('tooltip-arrow-down');

                arrowNode.removeClass('tooltip-arrow-left');

                arrowNode.removeClass('tooltip-arrow-right');

                arrowNode.removeClass('tooltip-arrow-horizontal-left');

                arrowNode.removeClass('tooltip-arrow-horizontal-right');

                arrowNode.setStyles({top: null, left: null});

            }