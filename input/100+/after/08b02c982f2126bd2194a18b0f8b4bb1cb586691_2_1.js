function(constructorFunction, creationCodeConstruct, argumentValues)

    {

        try

        {

            var newObject;



            if(constructorFunction == null && (ASTHelper.isObjectExpression(creationCodeConstruct) || creationCodeConstruct == null))

            {

                newObject = {};



                return new fcModel.JsValue(newObject, new fcModel.FcInternal(creationCodeConstruct, new fcModel.Object(this.globalObject, creationCodeConstruct, newObject)));

            }

            else if(ValueTypeHelper.isOfType(constructorFunction.value, Function))

            {

                var oldPrototype = constructorFunction.value.prototype;



                if(oldPrototype != null && oldPrototype.value != null)

                {

                    constructorFunction.value.prototype = oldPrototype.value;

                }



                newObject = new constructorFunction.value();



                if(oldPrototype != null && oldPrototype.value != null)

                {

                    constructorFunction.value.prototype = oldPrototype;

                }



                if(constructorFunction.fcInternal != null && constructorFunction.fcInternal.object != null

                && constructorFunction.fcInternal.object.prototypeDefinitionConstruct != null)

                {

                    this.globalObject.browser.callDataDependencyEstablishedCallbacks

                    (

                        creationCodeConstruct,

                        constructorFunction.fcInternal.object.prototypeDefinitionConstruct.codeConstruct,

                        this.globalObject.getPreciseEvaluationPositionId(),

                        constructorFunction.fcInternal.object.prototypeDefinitionConstruct.evaluationPositionId

                    );

                }



                return new fcModel.JsValue(newObject, new fcModel.FcInternal(creationCodeConstruct, new fcModel.Object(this.globalObject, creationCodeConstruct, newObject, constructorFunction.value.prototype)));

            }

            else if (constructorFunction != null && constructorFunction.isInternalFunction)

            {

                return this.executeConstructor(creationCodeConstruct, constructorFunction, argumentValues);

            }

            else

            {

                this.notifyError("Unknown state when creating object");

            }

        }

        catch(e) { this.notifyError("Error when creating object:" + e); }

    }