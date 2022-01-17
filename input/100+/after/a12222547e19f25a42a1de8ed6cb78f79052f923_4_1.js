function(threadTree, callback){
                    console.log(threadTree);
                    test.equals(threadTree.parents.length, 0);
                    test.equals(threadTree.getChild(0).getChildCount(), 1);
                    callback();
                }