function(element)

        {

            try

            {

                if(astHelper.isProgram(element))

                {

                    var html = "<div class=\"jsContainer\">";



                    if(element.body != null)

                    {

                        for(var i = 0; i < element.body.length; i++)

                        {

                            //var previousElement = element.body[i-1];  unused variable

                            var currentElement = element.body[i];



                            html += this.generateHtml(currentElement);

                        }

                    }



                    html += "</div>";

                    return html;

                }



                /**

                 * generalized

                 */

                else if (astHelper.isStatement(element))             { return this.generateStatement(element); }

                else if (astHelper.isExpression(element))            { return this.generateExpression(element); }



                /**

                 * rest

                 */

                else if (astHelper.isSwitchCase(element))            { return this.generateFromSwitchCase(element); }

                else if (astHelper.isCatchClause(element))           { return this.generateFromCatchClause(element); }

                else if (astHelper.isFunction(element))              { return this.generateFromFunction(element, true); }

                else if (astHelper.isVariableDeclaration(element))   { return this.generateFromVariableDeclaration(element); }

                else if (astHelper.isVariableDeclarator(element))    { return this.generateFromVariableDeclarator(element); }

                else if (astHelper.isLiteral(element))               { return this.generateFromLiteral(element); }

                else if (astHelper.isIdentifier(element))            { return this.generateFromIdentifier(element); }

                else

                {

                    console.log(element);

                    alert("Error while generating HTML in codeMarkupGenerator: unidentified ast element."); return "";

                }

            }

            catch(e)

            {

                alert("Error while generating HTML in codeMarkupGenerator: " + e);

            }

        }