function () {
                var choice = $(this), id = self.id(choice.data("select2-data"));
                if (indexOf(id, val) >= 0) {
                    choice.addClass("select2-disabled");
                } else {
                    choice.removeClass("select2-disabled");
                }
            }