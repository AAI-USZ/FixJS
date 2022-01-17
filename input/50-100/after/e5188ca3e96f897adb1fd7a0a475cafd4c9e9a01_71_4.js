function(node)
    {
        if (object)
        {
            var repObj = FW.Firebug.getRepObject(node);
            if (!repObj)
                repObj = FW.Firebug.getRepObject(node.getElementsByClassName("repTarget")[0]);

            FBTest.compare(object.innerHTML, repObj.parentNode.innerHTML, "Content matches");
            FBTest.compare(object, repObj.parentNode, "Objects matches");
        }

        callback(node);
    }