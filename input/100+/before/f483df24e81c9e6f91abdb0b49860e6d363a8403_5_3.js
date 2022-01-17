function(evalIdentifierCommand)

    {

        try

        {

            if(!ValueTypeHelper.isOfType(evalIdentifierCommand, Firecrow.Interpreter.Commands.Command) || !evalIdentifierCommand.isEvalIdentifierCommand()) { this.notifyError(evalIdentifierCommand, "Argument is not an EvalIdentifierExpressionCommand"); return; }



            var identifierConstruct = evalIdentifierCommand.codeConstruct;



            var identifier = this.executionContextStack.getIdentifier(identifierConstruct.name);

            var identifierValue = identifier != null ? identifier.value : null;



            this.executionContextStack.setExpressionValue(identifierConstruct, identifierValue);



            if(identifier != null)

            {

                if(!ASTHelper.isAssignmentExpression(identifierConstruct.parent) || identifierConstruct.parent.left != identifierConstruct || identifierConstruct.parent.operator.length == 2)

                {

                    if(identifier.lastModificationConstruct != null)

                    {

                        this.globalObject.browser.callDataDependencyEstablishedCallbacks

                        (

                            identifierConstruct,

                            identifier.lastModificationConstruct.codeConstruct,

                            this.globalObject.getPreciseEvaluationPositionId(),

                            identifier.lastModificationConstruct.evaluationPositionId

                        );

                    }

                }



                if(identifier.declarationConstruct != null && identifier.declarationConstruct != identifier.lastModificationConstruct)

                {

                   this.globalObject.browser.callDataDependencyEstablishedCallbacks

                   (

                       identifierConstruct,

                       ASTHelper.isVariableDeclarator(identifier.declarationConstruct.codeConstruct) ? identifier.declarationConstruct.codeConstruct.id

                                                                                                     : identifier.declarationConstruct.codeConstruct,

                       this.globalObject.getPreciseEvaluationPositionId()

                   );

                }



                if(this.globalObject.checkIfSatisfiesIdentifierSlicingCriteria(identifierConstruct))

                {

                    this.globalObject.browser.callImportantConstructReachedCallbacks(identifierConstruct);

                }

            }

        }

        catch(e)

        {

            this.notifyError(evalIdentifierCommand, "Error when evaluating identifier: " + e);

        }

    }