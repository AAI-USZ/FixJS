function(aNode){
        console.log("event: ",aNode, " id: ",aNode.id);

        if(aNode.id == "btnChildMode"){
            dojo.removeClass("btnSiblingMode","selected");
            dojo.addClass("btnChildMode","selected");
            dojo.attr(dojo.byId('componentTree'),"data-bf-addmode","child");
        }
        if(aNode.id == "btnSiblingMode"){
            dojo.removeClass("btnChildMode","selected");
            dojo.addClass("btnSiblingMode","selected");
            dojo.attr(dojo.byId('componentTree'),"data-bf-addmode","sibling");
        }

        var currentMode = dojo.attr("componentTree","data-bf-addMode");

        //get selected item from xfDoc tree
        var currentItem = dojo.byId(attrEditor.currentNodeId);
        if(currentItem == undefined) return;

        //switch state of buttons regardless of an existing selection
        if(currentMode == "child"){
            //get xfType from current item selected in xfDoc tree
            var currXfType = dojo.attr(dojo.byId(currentItem),"data-xf-type");
            console.log("current xfType: ", currXfType);

            this._renderComponentTree(currXfType);
        }else{
            //get parent item (not element!) of current item
            var parentUL = currentItem.parentNode;
            if(parentUL == undefined) return;
            console.log("parent: ", parentUL);

            var parentLI = parentUL.parentNode;
            if(parentLI == undefined) return;
            console.log("parentLI: ", parentLI);

            var parentXfType = dojo.attr(parentLI,"data-xf-type");
            if(parentXfType == undefined) return;
            console.log("parentXfType: ", parentXfType);

            this._renderComponentTree(parentXfType);

        }
    }