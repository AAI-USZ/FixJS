function () {
            if (element.val() !== $.data(element, key)) {
                $.removeData(element, key);
                element.trigger("keyup-change");
            }
        }