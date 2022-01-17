function (observable, ruleObj) {
                var ruleName = utils.newId();

                if ( ruleObj['message'] === undefined ) {

                    rulesObj['message'] = 'Error';
                }

                //Create an anonymous rule to reference
                ko.validation.rules[ruleName] = ruleObj;

                //add the anonymous rule to the observable
                ko.validation.addRule(observable, {
                    rule: ruleName,
                    params: ruleObj.params
                });
            }