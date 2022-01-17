function(threadTree, callback){
                    test.equals(threadTree.getChild(0).getChildCount(), 1);
                    callback();
                }