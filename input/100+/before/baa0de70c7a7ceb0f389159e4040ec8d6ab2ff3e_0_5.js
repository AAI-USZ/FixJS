function () {
    $(":input").each(function () {
        var tos = $(this).attr('data-val-changevisually-to');
        if (typeof tos !== 'undefined') {
            var toValues = tos.split("~");
            var otherPropertyNames = $(this).attr('data-val-changevisually-otherpropertyname').split("~");
            var ifOperators = $(this).attr('data-val-changevisually-ifoperator').split("~");
            var values = $(this).attr('data-val-changevisually-value').split("~");
            var conditionPassesIfNulls = $(this).attr('data-val-changevisually-conditionpassesifnull').split("~");

            var dependentProperty = $(this);

            //Get each unique other property name
            var uniqueOtherPropertyNames = $.unique(otherPropertyNames.slice());

            //go through each 'other' field and hook up the change event
            for (var iOuter = 0; iOuter < uniqueOtherPropertyNames.length; iOuter++) {
                var fullName = dependentProperty.attr('name').substr(0, dependentProperty.attr("name").lastIndexOf(".") + 1) + uniqueOtherPropertyNames[iOuter];
                var otherProperty = $("[name='" + fullName + "']");
                otherProperty.change({ otherPropertyOuterInitialName: uniqueOtherPropertyNames[iOuter], otherPropertyFullName: fullName }, function (event) {
                    for (var iInner = 0; iInner < otherPropertyNames.length; iInner++) {
                        if (otherPropertyNames[iInner] === event.data.otherPropertyOuterInitialName) {
                            var currentOtherProperty = $("[name='" + event.data.otherPropertyFullName + "']");
                            if (MvcMegaForms.ApplyChangeVisually(dependentProperty, currentOtherProperty, toValues[iInner], ifOperators[iInner], values[iInner], conditionPassesIfNulls[iInner])) {
                                break; //a condition has passed, don't process the rest
                            }
                        }
                    }
                });

                otherProperty.change();
            }
        }

        var parentId = $(this).attr("parentListId");
        if (typeof parentId !== 'undefined') {
            var parentList = $("[name='" + $(this).attr("name").substr(0, $(this).attr("name").lastIndexOf(".") + 1) + parentId + "']");

            parentList.attr("childid", $(this).attr('id'));

            parentList.change(function () {
                MvcMegaForms.SetupCascadingDropDown($(this));
            });

            parentList.change();
        }
    });
}