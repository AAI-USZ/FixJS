function EditContentNodeCtrl($xhr) {
    var scope;
    scope = this;

    // define data we are working with
    this.contentType = globalContentType;
    this.contentSchema = globalContentSchema;
    this.schemaRules = globalSchemaRules;
    this.contentNode = globalContentNode;      // will probably be empty
    this.contentNodeId = globalContentNodeId;    // -1 if not yet saved

    this.elementGroupsToRemove = [];

    function convertIdRefToInt(obj) {

        for (var item in obj) {
            var value = obj[item];

            if (typeof value == "object") {
                convertIdRefToInt(value);
            } else {
                if (item.endsWith("_idref")) {
                    if (typeof value == "string") {
                        if (value && value.indexOf(",") != -1) {
                            // dann ist das ein Array von IDs
                            var retval = Array();
                            var vals = value.split(",");
                            for (v in vals) {
                                retval.push(parseInt(vals[v]));
                            }
                            obj[item] = retval;
                        } else {
                            obj[item] = parseInt(value);
                        }
                    }
                }
            }

        }
        scope.$eval();
    }

    this.submit = function () {

        convertIdRefToInt(this.contentNode);

        // check whether content already exists or not
        if (this.contentNodeId < 0) {
            console.log("Going to create content ...");
            $xhr('POST', "/" + this.contentType, this.contentNode, function (code, response) {
                window.location.href = "/?highlightId=" + response.id;
            }, function (code, response) {
                alert("PROBLEM: " + response);
            });
            return false;
        } else {
            // content already exists
            console.log("Updating content node " + this.contentNodeId + " ...");
            $xhr('PUT', "/" + this.contentType + "/" + this.contentNodeId, this.contentNode, function (code, response) {
                window.location.href = "/?highlightId=" + response.id;
            }, function (code, response) {
                alert("PROBLEM: " + response);
            });
            return false;
        }
    };

    this.cancel = function () {
        console.log("Cancel form ...");
        window.history.back();
    };

    /**
     * Triggered when user presses the "Add" Button (sub elements in form).
     */
    scope.addChild = function (ctx) {
        if (ctx.child) {
            console.log("Add child (type: " + ctx.childtype + "): " + ctx.child + " parent: " + dump(ctx.parent, 1));
            ctx.child.push({ _type:ctx.childtype });

        } else {
            // TODO: never getting here
            console.log("Init child (type: " + ctx.childtype + "): " + ctx.childname);
            ctx.parent[ctx.childname] = [
                { _type:ctx.childtype }
            ];
        }
        /*
         scope.elementGroupsToRemove = ctx.allChildtypes.split(',');
         var idx = scope.elementGroupsToRemove.indexOf(ctx.childtype);
         if (idx != -1) {
         scope.elementGroupsToRemove.splice(idx, 1);
         } else {
         // by default remove first element
         scope.elementGroupsToRemove.splice(0, 1);
         }
         */
        // item hiding via directive 'autoremove' (defined in angular-widget.js)
    };


    /**
     * Triggered when user presses the "Remove" Button (sub elements in form).
     */
    scope.removeChild = function (ctx) {
        if (ctx.parent && ctx.elem) {
            console.log("remove child : " + dump(ctx.parent, 1) + " $index: " + this.$index);
            var parentfq = 'contentNode.' + findParentNode('arrfq', this.$element[0], "");
            parentfq = parentfq.slice(0, -1);
            parentfq = parentfq.slice(0, parentfq.lastIndexOf('.'));


//            var elem = scope.$get(parentfq);

            // wir kopieren uns die items
            var items = scope.$get(parentfq).slice();
            scope.$set(parentfq, []);
            scope.$eval();

            angular.Array.remove(items, ctx.elem);
            scope.$set(parentfq, items);
            scope.$eval();

        }
    };


    scope.helper = new CalloutDialogHelper();

    function findParentNode(attrname, childObj, suffix) {
        if (childObj.tagName == 'BODY') {
            return suffix;
        }
        if (childObj.getAttribute(attrname) != undefined) {
            suffix = childObj.getAttribute(attrname) + '.' + suffix;
        }
        return findParentNode(attrname, childObj.parentNode, suffix);
    }

    // Called by referencing input element (see widget.js)
    scope.simple_select_value = function (callout_url, target_prop_names, src_prop_names) {

        var parentfq = 'contentNode.' + findParentNode('arrfq', this.$element[0], "");


        var target_names = target_prop_names.split('#');
        var src_names = src_prop_names ? src_prop_names.split('#') : [];
        var fields = {};
        fields['update_fields'] = new Array();
        fields['values'] = new Array();
        fields['src_types'] = new Array();
        fields['src_properties'] = new Array();

        for (i in target_names) {
            var fq_target_name = target_names[i];
            if (fq_target_name) {
                // Special handling for array elements: insert position number
                fq_target_name = parentfq + fq_target_name;
                fields['update_fields'].push(fq_target_name);
                var cur_value = scope.$get(fq_target_name);
                fields['values'].push(cur_value);
                fields['src_types'].push('string');
                fields['src_properties'].push(src_names[i]);
            }
        }
        console.log("callout fields: " + dump(fields, 1));

        // Create Bootbox Modal with external selection form loaded as specified by callout URL
        return bootbox.dialog(scope.helper.selection_form(callout_url, fields), [
            {
                'label':'Cancel'
            },
            {
                'label':'Save',
                'class':'btn-primary success',
                'callback':function () {
                    return scope.save_values(calloutGetSelectedValues());
                }
            }
        ], {
            "animate":false
        });
    };


    // Called after "Save" Button in Callout-Dialog is pressed
    scope.save_values = function (doc_data) {
        console.log("doc_data: " + dump(doc_data));
        jQuery.each(doc_data, function (fieldname, val) {
            if (fieldname && fieldname != "null") {
                scope.$set(fieldname, val);
                console.log("Updated " + fieldname + " to: " + val);
            }
        });
        //scope.$set(fieldname, doc_data.value);
        //scope.$set('contentNode.title', doc_data.title);
        scope.$eval(); // force model update
    };

}