function() {
                if (button.selector == lastClickedButton) {
                    menu.css('visibility', 'hidden');
                    menuItems.css('visibility', 'hidden');
                } else {
                    menu.css('visibility', 'visible');
                    menuItems.css('visibility', 'hidden');
                    pickerMenu.css('visibility', 'visible');
                }
                lastClickedButton = button.selector;
            }