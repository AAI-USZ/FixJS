function(targetId) {
        console.log("attrEditor.editProperties: id of property sheet: ", targetId);
        var  currentNode =  dojo.byId(targetId);
        var dataXfAttrs = dojo.attr(currentNode, "data-xf-attrs");
        var dataXfType = dojo.attr(currentNode, "data-xf-type");

        // console.log("editProperties: dataXfAttrs: ", dataXfAttrs, " dataXfType", dataXfType);

        var xfAttrObj = dojox.json.ref.fromJson(dataXfAttrs);
        // console.log("editProperties xfAttrObj:", xfAttrObj);
        if (xfAttrObj) {
            for (attributeName in xfAttrObj) {
                var xfAttrValue = xfAttrObj[attributeName];
                if (!xfAttrValue)xfAttrValue = "";
                var currentDijitNode =  dojo.query("xf" + attributeName)[0];
                // console.log("editProperties: currentDijitNode: ", currentDijitNode);
                if (currentDijitNode) {
                    var currentDijit = dijit.byId(dojo.attr(currentDijitNode, "id"));
                    if (currentDijit) {
                        // console.log("editProperties: currentDijit: ", currentDijit, " - xfAttrValue:",xfAttrValue);
                        currentDijit.set("value", xfAttrValue);
                    }
                    else {
                        // console.log("editProperties: currentNode: ", currentDijitNode, " - xfAttrValue:",xfAttrValue);
                        dojo.attr(currentDijitNode, "value", xfAttrValue);
                    }
                }
                else {
                    // console.log("editProperties: currentNode: ", dojo.byId(attributeName), " - xfAttrValue:",xfAttrValue);
                    dojo.attr(dojo.byId(attributeName), "value", xfAttrValue);

                }

            }
        } else {
            console.warn("editProperties: Missing xfAttrObj for Element [id='",targetId,"']");
        }
        var valueNode = dojo.query(".textNode",currentNode)[0];
        // console.log("editProperties: valueNode: ", valueNode);
        if(valueNode) {
            var nodeValue =  valueNode.innerHTML;
            nodeValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            //var nodeValue =  valueNode.innerHTML.replace(/</g, "lt;").replace(/>/g, "gt;").replace(/\&/g, "amp;").replace(/\"/g, "quot;");
            // console.debug("editProperties: node value: ", nodeValue);
            var textContentNode =  dojo.byId("textcontent");
            var textContentDijit = dijit.byId(dojo.attr(textContentNode,"id"));
            if (textContentDijit) {
                textContentDijit.set("value",nodeValue);
            }else {
                dojo.attr(textContentNode, "value", nodeValue);
            }

        }



    }