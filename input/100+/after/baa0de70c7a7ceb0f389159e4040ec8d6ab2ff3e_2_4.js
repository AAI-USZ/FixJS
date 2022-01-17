function (dependantProperty, otherProperty, to, ifOperator, value, conditionPassesIfNull) {
    var conditionMet = false;
    conditionPassesIfNull = conditionPassesIfNull.toLowerCase() === 'true'; //it was a string, make it a bool
    var val = MvcMegaForms.GetFormValue(otherProperty);

    //treat empty string or undefined as null
    if (val === '' || val === undefined) {
        val = null;
    }
    if (value === '' || val === undefined) {
        value = null;
    }

    if (val === null && value !== null) {
        //value is null, condition is met if we wanted it to be met when null
        conditionMet = conditionPassesIfNull;
    } else if (val !== null && value === null) {
        //the value is not null, but we were looking for a null, determine what to do
        switch (ifOperator) {
            case "equals":
                conditionMet = false; //we wanted a null and it was not
                break;
            case "notequals":
                conditionMet = true; //we did not want a null and it was not
                break;
            default:
                alert('MvcMegaForms-ChangeVisually Critical Error: When checking for a null value, DisplayChangeIf must be Equals or NotEquals, supplied if operator was ' + ifOperator);
        }
    } else if (val === null && value === null) {
        //both are null, condition is met if we wanted it to be met when null
        conditionMet = conditionPassesIfNull;
    } else //both are not null
    {
        val = val.toString().toLowerCase();
        value = value.toString().toLowerCase();
        switch (ifOperator) {
            case "equals":
                conditionMet = val === value;
                break;
            case "notequals":
                conditionMet = val !== value;
                break;
            case "greaterthan":
                conditionMet = val > value;
                break;
            case "greaterthanorequals":
                conditionMet = val >= value;
                break;
            case "lessthan":
                conditionMet = val < value;
                break;
            case "lessthanorequals":
                conditionMet = val <= value;
                break;
            case "contains":
                for (var iMet = 0; iMet < val.length; iMet++) {
                    var currContainsItem = val[iMet].toLowerCase();
                    if (currContainsItem === value) {
                        conditionMet = true;
                        break;
                    }
                }
                break;
            case "notcontains":
                conditionMet = true;
                for (var iNotMet = 0; iNotMet < val.length; iNotMet++) {
                    var currNotContainsItem = val[iNotMet].toLowerCase();
                    if (currNotContainsItem === value) {
                        conditionMet = false;
                        break;
                    }
                }
                break;
            default:
                alert('MvcMegaForms-ChangeVisually Critical Error: Unknown DisplayChangeIf supplied ' + ifOperator);
        }
    }
    return conditionMet;
}