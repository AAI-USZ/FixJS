function(origin, target) {
        // console.debug("moveAllowed origin:", origin, " target:",target);
        var xfType = origin.attr("data-xf-type");
        // console.debug("xfType ",xfType);
        var targetType = target.attr("data-xf-type");
        // console.debug("check target:",targetType);

        //check rules look for match in drop target elements list of allowed children
        //if found 'true' 'false' otherwise
        var childArray=eval(targetType+"Childs");
        // console.debug("childArray: ",childArray);
        if(childArray == undefined){
            return false;
        }
        if(dojo.indexOf(childArray,xfType) != -1){
            return true;
        }else{
            return false;
        }
    }