function(self, operator, operatore) {
        operator = operator || operatore;
        if (operator in XPath.operators) {
            return XPath.operators[operator];
        } else {
            return operator;
        }
    }