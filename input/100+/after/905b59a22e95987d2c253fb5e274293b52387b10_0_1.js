function () {
            //option buttons
			var filterButtons = settings['filterButtons'];
            for (buttonItem in filterButtons) {
                buttonListContainer.append('<input type="checkbox" ' + (filterButtons[buttonItem]["DefaultSelected"] ? 'checked="Checked"' : "") + ' id="check' + buttonItem + '" primaryicon="' + filterButtons[buttonItem]["Icon"] + '" filtertype="' + filterButtons[buttonItem]["Type"] + '" filtername="' + filterButtons[buttonItem]["Title"] + '" /><label for="check' + buttonItem + '">' + filterButtons[buttonItem]["Title"] + '</label>');
            }

            $(function () {
                $("input", buttonListContainer).each(function (index) {
                    $(this).button({
                        icons: {
                            primary: $(this).attr("primaryicon")
                        }
                    }).click(function () {
                        loadResultsDataList();
                    });
                });
            });
        }