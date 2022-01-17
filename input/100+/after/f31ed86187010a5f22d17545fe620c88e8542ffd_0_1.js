function (event) {
                    selectField.siblings("." + settings.classText).html(selectField.children("option:contains(" + selectField.val() + ")").text());
                    if (settings.extraStyles == true) {
                        selectField.parent(className).addClass(settings.classEnd).removeClass(settings.classFocus); //optional styling to be used once a selection has been made
                    }
                    if (selectField.val() == '' || selectField.val() == undefined || selectField.val() == null) {
                        selectField.parent(className).removeClass(settings.classEnd);
                    }
                }