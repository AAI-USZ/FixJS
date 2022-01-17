function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    var child = osgDB.parseSceneGraph(JSON.parse(req.responseText));
                    if (cbfunc) {
                        cbfunc(child);
                    }
                    node.addChild(child);
                    removeLoading(node, child);
                    osg.log("success " + url);
                } else{
                    removeLoading(node, child);
                    osg.log("error " + url);
                }
            }
        }