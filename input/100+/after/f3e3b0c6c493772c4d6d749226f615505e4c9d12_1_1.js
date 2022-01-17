function processField(field, fieldKey) {
            var qualifiedName = this.parentName + '.' + fieldKey,
                fullyQualifiedName = this.fqName + '.' + fieldKey,
                fieldElStr;
            
            console.log("----> field: " + fullyQualifiedName + ", relative: " + qualifiedName);

            // has hierarchical subforms? Must be declared in a type struct (single) or map (multi-typed)
            if (field.type == 'array' && field.items && field.ui_class != 'compact') {

                var childElem = fieldKey + 'Elem';
                var multiTyped = true;

                // if items is a singular value set it to an array to make the rest work
                //    expect either object with properties or type with map of different sub-types
                if (field.items.type == 'object') {
                    multiTyped = false;
                    field.items.type = [ field.items ];
                }

                // ~~~~ FIXME start (init array top-level)
                var contentChilds = scope.$eval(qualifiedName);
                if (!contentChilds) {
                    var propName = fullyQualifiedName.substr('contentNode'.length + 1);
                    console.log("No content childs yet for " + propName);
                    var propNameArr = propName.split('.');
                    if (propNameArr.length == 1) {
                        console.log("... init array: " + propName);
                        globalContentNode[propNameArr[0]] = [{"_type":field.items.type[0].id}];  // TODO: really use first type as default?
                    } else {
                        console.log("============= WARN cannot initialize arrays: " + propNameArr);
                    }
                }
                // ~~~~ FIXME end (init array top-level)

                // (A) subform header (with move up/down button)
                var subform = angular.element('<ul ui:sortable class="sortable subform" ui:items="' + qualifiedName + '"></ul>');
                var repeater = angular.element('<li ng:repeat="' + childElem + ' in ' + qualifiedName + '" ' +
                    (multiTyped ? 'jq:autoremove' : '') + ' ui:items="' + qualifiedName + '" arrfq ="' + fieldKey + '.{{$index}}"></li>');
                var subfieldset = angular.element('<fieldset></fieldset>');
                var legendChild = angular.element('<legend>' + field.title + '{{$index}}</legend>');

                // ~~ remove (per individual child group)

                var removeButton = angular.element('<a class="remove" href="#" ng:click="removeChild({' +
                    " parent:'" + qualifiedName + "', elem:" + childElem + '}' +
                    ')"><i class="icon-minus" title="Remove ' + field.title + '"></i></a>');

/*
                var removeButton = angular.element('<a class="remove" href="#" ng:click="' + qualifiedName + '.$remove(' + qualifiedName +"[$index]"+
                    ')"><i class="icon-minus" title="Remove ' + field.title + '"></i></a>');
*/

                legendChild.append(removeButton);
                subfieldset.append(legendChild);

                // (B) render individual fields of subform
                jQuery.each(field.items.type, function (subIdx, subfield) {
                    if (typeof subfield.id == 'undefined') {
                        subfield.id = subfield.title;
                    }
                    console.log("Add sub element for type: " + subfield.id);
                    var elGroup = angular.element('<div class="subelements ' + subfield.id + '"></div>');
                    var arraySuffix = "";
                    console.log("scope idx: " + scope.$index);

                    var arr_level = scope.$get('arr_level');

                    if (arr_level != undefined) {
                        arraySuffix =  '.' + arr_level;
                        console.log("array suffix: " + arraySuffix);

                    }
                    angular.forEach(subfield.properties, processField,
                        {parentName: childElem, fqName: fullyQualifiedName + arraySuffix, curDOMParent: elGroup, childtype: subfield.id});
                    subfieldset.append(elGroup);
                });
                repeater.append(subfieldset);
                subform.append(repeater);
                this.curDOMParent.append(subform);

                // (C) bottom: place add button for all available sibling types   TODO: transform into drop-downlist
                var localScope = this;
                var subfieldTypes = [];
                jQuery.each(field.items.type, function (subIdx, subfield) {
                    subfieldTypes.push(subfield.id);
                });

                jQuery.each(field.items.type, function (subIdx, subfield) {
                    // ~~ add sub-entity button (available no matter how many already exist)
                    var addButton = angular.element('<div class="btn_add"><a href="#" ' +
                        ' ng:click="addChild({parent:'+ localScope.parentName +',' +
                        ' child:' + qualifiedName + ', childname: \'' + fieldKey + '\',' +
                        ' childtype: \'' + subfield.id + '\', allChildtypes: \'' + subfieldTypes + '\'})">' +
                        '<i class="icon-plus" title="Add ' + subfield.title + '"></i>' + subfield.title + '</a></div>');
                    localScope.curDOMParent.append(addButton);
                });

                return;
            }

            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Start Render Field Type

            if (field.ui_class != 'hidden') {
                var controlGroup = angular.element('<div class="control-group"></div>');

                // ~~ Label for input element
                controlGroup.append(angular.element('<label class="control-label" for="' + qualifiedName + '">' + field.title + '</label>'));
                var controlElem = angular.element('<div class="controls">');

                var typeLength = "medium";
                if (field.ui_width) {
                    typeLength = field.ui_width;
                }
                var lengthCssClassName = 'input-' + typeLength;

                if (field.type == 'array' && field.ui_class == 'compact') {
                    fieldElStr  = '<input type="text" class="valueArray ' + lengthCssClassName + '" ui:item="' + qualifiedName + '" ';
                    fieldElStr += ' ui:valueArray >';
                }
                else if (field.enum) {
                    fieldElStr  = '<ul ui:selectable-container class="selectBox">';
                    fieldElStr += '    <li ui:selectable="' + qualifiedName + '" ng:repeat="i in [';
                    for (var idx in field.enum) {
                        fieldElStr += '\'' + field.enum[idx] + '\'';
                        if (idx < field.enum.length-1) {
                            fieldElStr += ',';
                        }
                    }
                    fieldElStr += ']" data-value="{{i}}"  data-options="' + field.enum.join(',') + '">';
                    fieldElStr += '        <div class="name">{{i}}</div>';
                    fieldElStr += '    </li>';
                    fieldElStr += '</ul>';
                }
                else if (field.ui_callout) {
                    fieldElStr  = '<div class="reference input-append">';
                    fieldElStr += '  <input class="' + lengthCssClassName + '" name="' + qualifiedName + '">';
                    if (field.ui_callout.target_properties) {
                        var targetProperties = "";
                        for (i in field.ui_callout.target_properties) {
                            targetProperties +=  field.ui_callout.target_properties[i] + "#";
                        }
                        console.log("fields to update: " + targetProperties);
                        var srcPropNames = field.ui_callout.src_properties.join('#');
                        fieldElStr += '  <span class="add-on" ng:click="simple_select_value(\'' + field.ui_callout.url + '\',\'' + targetProperties +'\',\'' + srcPropNames +'\'';
                    } else {
                        // TODO: Should we require to specify: ui_update
                        fieldElStr += '  <span class="add-on" ng:click="simple_select_value(\'' + field.ui_callout.url + '\',\'' + fullyQualifiedName + '\'';
                    }
                    fieldElStr += ')"><i class="icon-edit"></i></span>';
                    fieldElStr += '</div>';
                }
                else if (field.format == 'date') {
                    fieldElStr  = '<div class="reference">';
                    fieldElStr += '<input type="text" class="datepicker ' + lengthCssClassName + '"';
                    if (field.ui_class == 'readonly') {
                        fieldElStr += ' readonly="readonly"';
                    } else {
                        // dateFormat according to http://docs.jquery.com/UI/Datepicker/formatDate
                        fieldElStr += ' ui:datepicker ui:date="' + qualifiedName + '" ui:options="{dateFormat: \'yy-mm-dd\', showOn: \'both\',';
                        fieldElStr += '                       buttonImage: \'/public/images/calendar.gif\', buttonImageOnly: true, firstDay: 1, gotoCurrent: true}"';
                    }
                    fieldElStr += '></div>';
                }
                else if (field.ui_editor == 'richtext') {
                    fieldElStr = '<textarea ui:tinymce class="mceRichText ' + lengthCssClassName + '" name="' + qualifiedName + '" ';

                    //angular.forEach(field, function(attribute) {
                    //    fieldElStr += attribute + '="' + field[attribute] + '" ';
                    //});

                    fieldElStr += ' rows="12" cols="72"></textarea>';
                }
                else if (field.ui_editor == 'textarea') {
                    fieldElStr = '<textarea class="' + lengthCssClassName + '" name="' + qualifiedName + '" ';
                    if (field.ui_class == 'readonly') {
                        fieldElStr += ' readonly="readonly"';
                    }
                    //angular.forEach(field, function(attribute) {
                    //    fieldElStr += attribute + '="' + field[attribute] + '" ';
                    //});

                    fieldElStr += ' rows="8" cols="72"></textarea>';
                }
                else if (field.type == 'object') {
                    fieldElStr = angular.element('<div class="subelements ' + fieldKey + '"></div>');
                    //console.log("**** Include sub-object structure for " + fieldKey);
                    angular.forEach(field.properties, processField,
                        {parentName: fullyQualifiedName, fqName: fullyQualifiedName, curDOMParent: fieldElStr});
                }
                else if (field.type == 'boolean') {
                    fieldElStr = '<input class="' + lengthCssClassName + '" name="' + qualifiedName + '" ';
                    fieldElStr += ' type="checkbox"';
                    // should set default value?
                    if (globalContentNodeId == -1 && field.default == true) {
                        fieldElStr += ' checked="checked"';
                    }
                    if (field.ui_class == 'readonly') {
                        fieldElStr += ' readonly="readonly"';
                    }
                    fieldElStr += '>';
                }
                // ~~ "normal" text input field
                else {
                    fieldElStr = '<input class="' + lengthCssClassName + '" name="' + qualifiedName + '" ';
                    angular.forEach(field, function(value, attribute) {
                        if (attribute != 'tag') {
                            fieldElStr += attribute + '="' + value + '" ';
                        }
                    });
                    // set default value for freshly created content
                    if (globalContentNodeId == -1 && field.default) {
                        fieldElStr += ' value="' + field.default + '"';
                    }
                    if (field.ui_class == 'readonly') {
                        fieldElStr += ' readonly="readonly"';
                    }
                    fieldElStr += '>';
                }

                /* type == 'autoComplete':
                 // TODO: Under development (still hard-code to use tag search)
                 fieldElStr  = '<input type="textbox" class="autoComplete ' + lengthClassName + '"';
                 fieldElStr += '  ui:autocomplete ui:options="{urls: {list: \'/tag/search?q=\'}}" ui:item="' + qualifiedName + '" />';
                */

                controlElem.append(fieldElStr);
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ End Render Field Type

                // ~~ optionally add help hint
                if (field.description) {
                    controlElem.append('<p class="help-block">' + field.description + '</p>');
                }
                controlGroup.append(controlElem);
                this.curDOMParent.append(controlGroup);
            } // skip hidden field
        }