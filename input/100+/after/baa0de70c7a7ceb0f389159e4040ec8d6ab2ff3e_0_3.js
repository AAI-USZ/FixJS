function (val, element, dependentproperty, dependentvalue) {
        if (val !== null && $.trim(val) !== '' && val != undefined) {
            return false;
        }
        var modelPrefix = element.name.substr(0, element.name.lastIndexOf(".") + 1);
        var otherProperty = $("[name='" + modelPrefix + dependentproperty + "']");
        var otherVal = MvcMegaForms.GetFormValue(otherProperty).toLowerCase();
        for (var i = 0; i < otherVal.length; i++) {
            var currValue = otherVal[i].toLowerCase();
            if (currValue === dependentvalue) {
                return false;
            }
        }
        return true;
    }