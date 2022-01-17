function (observable, ruleObj) {
                var ruleName = utils.newId();

                //Create an anonymous rule to reference
                ko.validation.rules[ruleName] = {
                    validator: ruleObj.validator,
                    message: ruleObj.message || 'Error'
                };

                //add the anonymous rule to the observable
                ko.validation.addRule(observable, {
                    rule: ruleName,
                    params: ruleObj.params
                });
            }