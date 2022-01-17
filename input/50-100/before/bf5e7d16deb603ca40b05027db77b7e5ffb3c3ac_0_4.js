function () {
                var choice = $(this), id = choice.data("select2-data").id;
                if (indexOf(id, val) >= 0) {
                    choice.addClass("select2-disabled");
                } else {
                    choice.removeClass("select2-disabled");
                }
            }