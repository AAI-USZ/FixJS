function () {
            //if geolocation is available add the button
            if (navigator.geolocation)
                $("<input type='button' value='get your location' />").appendTo(buttonListContainer).click(getUserLocation);
            
            //option buttons
			var filterButtons = settings['filterButtons'];
            for (buttonItem in filterButtons) {
                buttonListContainer.append('<input type="checkbox" id="check' + buttonItem + '" primaryicon="' + filterButtons[buttonItem]["Icon"] + '" filtertype="' + filterButtons[buttonItem]["Type"] + '" filtername="' + filterButtons[buttonItem]["Title"] + '" /><label for="check' + buttonItem + '">' + filterButtons[buttonItem]["Title"] + '</label>');
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