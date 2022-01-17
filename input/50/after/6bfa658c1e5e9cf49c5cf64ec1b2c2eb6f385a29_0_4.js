function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            element.style.display = value ? "inline" : "none";
        }