function(thisObject, functionObject, arguments, callExpression, callCommand)

    {

        try

        {

            if(thisObject == null) { this.notifyError("This object can not be null when executing function!"); return; }



            if(callCommand.isCall || callCommand.isApply)

            {

                if(functionObject == null || functionObject.value == null || functionObject.value.jsValue == null || functionObject.value.jsValue.fcInternal == null)

                {

                    this.notifyError("Error when executing call applied internal method!");

                }



                if(functionObject.value.jsValue.fcInternal.ownerObject == Math)

                {

                    return fcModel.MathExecutor.executeInternalMethod(thisObject, functionObject, arguments, callExpression);

                }

                else{ this.notifyError("Unhandled call applied internal method"); }

            }



            if(ValueTypeHelper.isOfType(thisObject.value, Array)) { return fcModel.ArrayExecutor.executeInternalArrayMethod(thisObject, functionObject, arguments, callExpression, callCommand); }

            else if (ValueTypeHelper.isString(thisObject.value)) { return fcModel.StringExecutor.executeInternalStringMethod(thisObject, functionObject, arguments, callExpression, callCommand); }

            else if (ValueTypeHelper.isOfType(thisObject.value, RegExp)) { return fcModel.RegExExecutor.executeInternalRegExMethod(thisObject, functionObject, arguments, callExpression); }

            else if (ValueTypeHelper.isOfType(thisObject.value, DocumentFragment)){ return fcModel.DocumentExecutor.executeInternalMethod(thisObject, functionObject, arguments, callExpression); }

            else if (ValueTypeHelper.isOfType(thisObject.value, Document)){ return fcModel.DocumentExecutor.executeInternalMethod(thisObject.fcInternal.globalObject.jsFcDocument, functionObject, arguments, callExpression);}

            else if (ValueTypeHelper.isOfType(thisObject.value, HTMLElement)) { return fcModel.HtmlElementExecutor.executeInternalMethod(thisObject, functionObject, arguments, callExpression); }

            else if (ValueTypeHelper.isOfType(thisObject.value, fcModel.Math)) { return fcModel.MathExecutor.executeInternalMethod(thisObject, functionObject, arguments, callExpression); }

            else if (functionObject.fcInternal.isInternalFunction)

            {

                if(ValueTypeHelper.arrayContains(fcModel.GlobalObject.CONST.INTERNAL_PROPERTIES.METHODS, functionObject.value.name))

                {

                    return fcModel.GlobalObjectExecutor.executeInternalFunction(functionObject, arguments, callExpression, this.globalObject);

                }

                else

                {

                    this.notifyError("");

                }

            }

            else

            {

                this.notifyError("Unsupported internal function!");

            }

        }

        catch(e)

        {

            this.notifyError("Error when executing internal function: " + e);

        }

    }