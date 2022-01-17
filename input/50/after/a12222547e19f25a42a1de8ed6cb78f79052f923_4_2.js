function(threadTree, callback){
                    console.log(threadTree);
                    test.equals(threadTree.getChild(0).parentID.toString(), threadChild.parentID.toString());
                    callback();
                }