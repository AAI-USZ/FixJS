function () {
            if (element.val() !== element.data("keyup-change-value")) {
                element.trigger("keyup-change");
            }
        }