function(node)
    {
        if (object)
        {
            var repObj = FW.Firebug.getRepObject(node);
            if (!repObj)
                repObj = FW.Firebug.getRepObject(node.getElementsByClassName("repTarget")[0]);

            FBTest.compare(object.parentNode.innerHTML, repObj.parentNode.innerHTML, "Element matches");
            FBTest.compare(object.innerHTML, repObj.innerHTML, "Content matches");
            FBTest.compare(object, repObj, "Objects matches");
        }

        callback(node);
    }