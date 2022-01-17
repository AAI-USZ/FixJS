function(evalAssignmentExpressionCommand)

    {

        try

        {

            if(!ValueTypeHelper.isOfType(evalAssignmentExpressionCommand, Firecrow.Interpreter.Commands.Command) || !evalAssignmentExpressionCommand.isEvalAssignmentExpressionCommand()) { this.notifyError(evalAssignmentExpressionCommand, "Argument is not an EvalAssignmentExpressionCommand"); return; }



            var assignmentExpression = evalAssignmentExpressionCommand.codeConstruct;



            var operator = evalAssignmentExpressionCommand.operator;

            var finalValue = null;



            this.globalObject.browser.callDataDependencyEstablishedCallbacks(assignmentExpression, evalAssignmentExpressionCommand.leftSide, this.globalObject.getPreciseEvaluationPositionId());

            this.globalObject.browser.callDataDependencyEstablishedCallbacks(assignmentExpression, evalAssignmentExpressionCommand.rightSide, this.globalObject.getPreciseEvaluationPositionId());



            this.addDependenciesToTopBlockConstructs(assignmentExpression);



            if(operator == "=")

            {

                finalValue = this.executionContextStack.getExpressionValue(evalAssignmentExpressionCommand.rightSide);

            }

            else

            {

                var leftValue = this.executionContextStack.getExpressionValue(evalAssignmentExpressionCommand.leftSide);

                var rightValue = this.executionContextStack.getExpressionValue(evalAssignmentExpressionCommand.rightSide);



                var result = null;



                if(operator == "+=") { result = leftValue.value + rightValue.value; }

                else if (operator == "-=") { result = leftValue.value - rightValue.value; }

                else if (operator == "*=") { result = leftValue.value * rightValue.value; }

                else if (operator == "/=") { result = leftValue.value / rightValue.value; }

                else if (operator == "%=") { result = leftValue.value % rightValue.value; }

                else if (operator == "<<=") { result = leftValue.value << rightValue.value; }

                else if (operator == ">>=") { result = leftValue.value >> rightValue.value; }

                else if (operator == ">>>=") { result = leftValue.value >>> rightValue.value; }

                else if (operator == "|=") { result = leftValue.value | rightValue.value; }

                else if (operator == "^=") { result = leftValue.value ^ rightValue.value; }

                else if (operator == "&=") { result = leftValue.value & rightValue.value; }

                else { this.notifyError(evalAssignmentExpressionCommand, "Unknown assignment operator!"); return; }



                finalValue = new fcModel.JsValue(result, new fcModel.FcInternal(assignmentExpression, null));

            }



            finalValue = finalValue.isPrimitive() ? finalValue.createCopy(evalAssignmentExpressionCommand.rightSide) : finalValue;



            if(assignmentExpression.loc.start.line == 169)

            {

                var a = 3;

            }





            if(ASTHelper.isIdentifier(evalAssignmentExpressionCommand.leftSide))

            {

                if(this.globalObject.checkIfSatisfiesIdentifierSlicingCriteria(evalAssignmentExpressionCommand.leftSide))

                {

                    this.globalObject.browser.callImportantConstructReachedCallbacks(evalAssignmentExpressionCommand.leftSide);

                }



                this.executionContextStack.setIdentifierValue

                (

                    evalAssignmentExpressionCommand.leftSide.name,

                    finalValue,

                    assignmentExpression

                );

            }

            else

            {

                var object = this.executionContextStack.getExpressionValue(evalAssignmentExpressionCommand.leftSide.object);

                var property = this.executionContextStack.getExpressionValue(evalAssignmentExpressionCommand.leftSide.property);



                if(object == null || (object.value == null && object != this.globalObject)) { this._callExceptionCallbacks(); return; }



                if(ValueTypeHelper.isOfType(object.value, HTMLElement))

                {

                    object.value[property.value] = finalValue.value;

                }

                else if (object == this.globalObject)

                {

                    this.globalObject.addProperty(property.value, finalValue.value,  assignmentExpression);

                }

                else

                {

                    object.value[property.value] = finalValue;

                }



                if(property.value == "__proto__") { object.value[property.value] = finalValue.value;}



                object.fcInternal.object.addProperty(property.value, finalValue, assignmentExpression, true);



                if(ValueTypeHelper.isArray(object.value)) { object.fcInternal.object.updateItem(property.value, finalValue); }

            }



            this.executionContextStack.setExpressionValue(assignmentExpression, finalValue);

        }

        catch(e)

        {

            this.notifyError(evalAssignmentExpressionCommand, "Error when evaluating assignment expression " + e);

        }

    }