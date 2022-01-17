function() {
            var self = this;

            self.$node.addClass('datepicker');

            self.options._selected = null;

            self.menu = BaseMenu(self.$node.find('.datepicker-menu'))
                .on('click', 'h4 .left, h4 .right', function() {
                    var date = self.options.date,
                        forward = $(this).hasClass('right');
                    self.set('date', date.add('months', forward? 1 : -1));
                }).on('click', '.monthview td', function() {
                    var selectedDate = self.monthView.tdElToDate(this);
                    if (selectedDate) {
                        self.setValue(selectedDate);
                    }
                });

            self.input = TextBox(self.$node.children('input[type=text]'))
                .on('blur', self._verifyInputValue)
                .on('focus', self.menu.show)
                .on('keyup', function(evt) {
                    if (Widget.identifyKeyEvent(evt) === 'enter') {
                        self._verifyInputValue();
                    }
                });

            self.monthView = DatePicker.MonthView(
                self.menu.$node.find('.monthview').empty(),
                {date: self.options.date});

            self.onPageClick(self.menu.hide, {once: false});

            self.update();
        }