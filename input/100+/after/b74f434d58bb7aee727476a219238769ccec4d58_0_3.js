function(objectExpression)

        {

            try

            {

                if(!astHelper.isObjectExpression(objectExpression)) { alert("Invalid element when generating object expression html code!"); return ""; }



                var _style = this.getStyle(objectExpression);

                var _id = "astElement" + this.formatId(objectExpression.nodeId);

                var _class = astHelper.CONST.EXPRESSION.ObjectExpression + " node";



                var _containerStyle = "display: block";

                var _propertyContainerStyle = "";



                var _isEmptyObject = false;



                var _hasGettersOrSetters = false;

                var _hasMoreThanTwoProperties = false;

                var _hasFunctionExpressions = false;



                var generateInNextLine = false;



                if (objectExpression.properties.length == 0)

                {



                    _isEmptyObject = true;

                }

                else

                {

                    if (objectExpression.properties.length > 2)

                    {

                        _hasMoreThanTwoProperties = true;

                    }

                    for(var i = 0; i < objectExpression.properties.length; i++)

                    {



                        if (objectExpression.properties[i].kind == "get"

                            || objectExpression.properties[i].kind == "set")

                        {

                            _hasGettersOrSetters = true;

                        }



                        for (var j = 0; j < objectExpression.properties[i].children.length; j++)

                        {

                            if (objectExpression.properties[i].children[j] == "FunctionExpression")

                            {

                                _hasFunctionExpressions = true;

                            }

                        }

                    }

                }





                if (_isEmptyObject == true

                    || (_hasMoreThanTwoProperties == false

                    && _hasFunctionExpressions == false

                    && _hasGettersOrSetters == false)

                    )

                {

                    _containerStyle = "display: inline;";

                    _propertyContainerStyle = "display: inline;";

                }

                else

                {

                    generateInNextLine = true;

                    _propertyContainerStyle = "display: block; padding-left: 20px;";

                }



                var html = this.getStartElementHtml(

                    "div",

                    {

                        class: _class,

                        style: "display: inline;",

                        id: _id

                    }

                );



                if (objectExpression.properties.length == 0)

                {

                    html += "{}";

                }

                else

                {

                    if (generateInNextLine)

                    {

                        html += "<br>";

                    }



                    html += '{';



                    for (var i = 0; i < objectExpression.properties.length; i++)

                    {

                        var id = "astElement" + this.formatId(objectExpression.properties[i].nodeId);

                        html += '<div class="objectProperty node" id ="' + id + '" style ="' + _propertyContainerStyle + '">';



                        if (objectExpression.properties[i].kind == "init")

                        {

                            html += this.generateHtml(objectExpression.properties[i].key) + ': '

                                + this.generateHtml(objectExpression.properties[i].value);

                        }

                        else

                        {

                            html += this.getElementHtml("span", {class: "keyword"}, objectExpression.properties[i].kind)

                                + " " + this.generateHtml(objectExpression.properties[i].key);



                            if (astHelper.isFunctionExpression(objectExpression.properties[i].value))

                                html += this.generateFromFunction(objectExpression.properties[i].value, false);

                            else

                                html += this.generateExpression(objectExpression.properties[i].value);

                        }



                        if (i != 0 && i < objectExpression.properties.length - 1

                            || i == 0 && objectExpression.properties.length > 1)

                        {

                            html += ', ';

                        }





                        html += '</div>';

                    }



                    html += '}'

                }



                html += this.getEndElementHtml("div");

                return html;

            }

            catch(e) { alert("Error when generating HTML from object expression:" + e);

            }

        }