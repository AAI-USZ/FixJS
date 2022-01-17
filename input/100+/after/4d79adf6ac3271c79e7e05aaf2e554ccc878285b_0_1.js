function installKeyUpChangeEvent(element) {
        var key="keyup-change-value";
        element.bind("keydown", function () {
            if (!$.hasData(element, key)) {
                $.data(element, key, element.val());
            }
        });
        element.bind("keyup", function () {
            if (element.val() !== $.data(element, key)) {
                $.removeData(element, key);
                element.trigger("keyup-change");
            }
        });
    }