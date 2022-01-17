function constructMemoizedTagReplacement(dataBindAttributeValue, tagToRetain, templateEngine) {
        var dataBindKeyValueArray = ko.jsonExpressionRewriting.parseObjectLiteral(dataBindAttributeValue);
        validateDataBindValuesForRewriting(dataBindKeyValueArray);
        var rewrittenDataBindAttributeValue = ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(dataBindKeyValueArray);

        // For no obvious reason, Opera fails to evaluate rewrittenDataBindAttributeValue unless it's wrapped in an additional
        // anonymous function, even though Opera's built-in debugger can evaluate it anyway. No other browser requires this
        // extra indirection.
        var applyBindingsToNextSiblingScript = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() { \
            return (function() { return { " + rewrittenDataBindAttributeValue + " } })() \
        })";
        return templateEngine['createJavaScriptEvaluatorBlock'](applyBindingsToNextSiblingScript) + tagToRetain;
    }