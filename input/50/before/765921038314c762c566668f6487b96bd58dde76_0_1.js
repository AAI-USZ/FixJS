function(self, operator) {
        if (operator in XPath.operators) {
            return XPath.operators[operator];
        } else {
            return operator;
        }
    }