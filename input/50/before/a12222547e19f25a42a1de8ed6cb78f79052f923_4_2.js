function(threadTree, callback){
                    test.equals(threadTree.getChild(0).parentID.toString(), threadChild.parentID.toString());
                    callback();
                }