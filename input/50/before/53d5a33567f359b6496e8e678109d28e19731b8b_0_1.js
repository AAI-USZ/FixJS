function (element) {
            var handler = function () {
                element.select();
            };

            ko.utils.registerEventHandler(element, "focus", handler);
        }