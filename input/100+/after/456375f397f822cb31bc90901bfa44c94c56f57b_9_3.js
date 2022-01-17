function(evalMemberExpressionCommand)

    {

        try

        {

            if(!ValueTypeHelper.isOfType(evalMemberExpressionCommand, Firecrow.Interpreter.Commands.Command) || !evalMemberExpressionCommand.isEvalMemberExpressionCommand()) { this.notifyError(evalMemberExpressionCommand, "Argument is not an EvalMemberExpressionCommand"); return; }



            var memberExpression = evalMemberExpressionCommand.codeConstruct;



            if(memberExpression.loc.start.line == 21)

            {

                var a = 3;

            }



            var object = this.executionContextStack.getExpressionValue(memberExpression.object);



            if(object == null || (object.value == null && object != this.globalObject)) { this._callExceptionCallbacks(); return; }



            var property = this.executionContextStack.getExpressionValue(memberExpression.property);



            var propertyValue = object != this.globalObject ? object.value[property.value]

                                                            : this.globalObject.getPropertyValue(property.value);



            var propertyExists = propertyValue !== undefined;



            if(!ValueTypeHelper.isOfType(propertyValue, fcModel.JsValue))

            {

                if(ValueTypeHelper.isPrimitive(propertyValue))

                {

                     propertyValue = new fcModel.JsValue(propertyValue, new fcModel.FcInternal(memberExpression));

                }

                else if(propertyValue != null && propertyValue.jsValue != null)

                {

                    propertyValue = propertyValue.jsValue;

                }

                else

                {

                    this.notifyError(evalMemberExpressionCommand, "The property value should be of type JsValue"); return;

                }

            }



            if(property != null && object != null)

            {

                if(object.fcInternal != null && object.fcInternal.object != null)

                {

                    var fcProperty = object.fcInternal.object.getProperty(property.value, memberExpression);



                    if(fcProperty != null && !ASTHelper.isLastPropertyInLeftHandAssignment(memberExpression.property))

                    {

                        if(fcProperty.lastModificationConstruct != null)

                        {

                            this.globalObject.browser.callDataDependencyEstablishedCallbacks

                            (

                                memberExpression.property,

                                fcProperty.lastModificationConstruct.codeConstruct,

                                this.globalObject.getPreciseEvaluationPositionId(),

                                fcProperty.lastModificationConstruct.evaluationPositionId

                            );

                        }

                        else  if(fcProperty.declarationConstruct != null)

                        {

                            this.globalObject.browser.callDataDependencyEstablishedCallbacks

                            (

                                memberExpression.property,

                                fcProperty.declarationConstruct.codeConstruct,

                                this.globalObject.getPreciseEvaluationPositionId(),

                                fcProperty.declarationConstruct.evaluationPositionId

                            );

                        }

                    }

                }

            }



            this.globalObject.browser.callDataDependencyEstablishedCallbacks(memberExpression, memberExpression.object, this.globalObject.getPreciseEvaluationPositionId());



            //Create a dependency only if the property exists, the problem is that if we don't ignore it here, that will lead to links

            //to constructs where the property was not null

            if(propertyExists || !ASTHelper.isIdentifier(memberExpression.property) || ASTHelper.isLastPropertyInLeftHandAssignment(memberExpression.property))

            {

                this.globalObject.browser.callDataDependencyEstablishedCallbacks(memberExpression, memberExpression.property, this.globalObject.getPreciseEvaluationPositionId());

            }



            this.executionContextStack.setExpressionValue(memberExpression, propertyValue);

        }

        catch(e) { this.notifyError(evalMemberExpressionCommand, "Error when evaluating member expression: " + e); }

    }