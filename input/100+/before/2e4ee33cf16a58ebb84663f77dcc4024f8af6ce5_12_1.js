function() {
        var result = osgDB.parseSceneGraph(tree);

        var FindAnimationManagerVisitor = function() { 
            osg.NodeVisitor.call(this, osg.NodeVisitor.TRAVERSE_ALL_CHILDREN); 
            this._cb = undefined
        };
        FindAnimationManagerVisitor.prototype = osg.objectInehrit( osg.NodeVisitor.prototype, {
            init: function() {
                this.found = [];
            },
            apply: function(node) {
                var cbs = node.getUpdateCallbackList();
                for (var i = 0, l = cbs.length; i < l; i++) {
                    if ( cbs[0] instanceof osgAnimation.BasicAnimationManager ) {
                        this._cb = cbs[0];
                        return;
                    }
                }
                this.traverse(node);
            }
        });
        var finder = new FindAnimationManagerVisitor();
        result.accept(finder);
        var animationManager = finder._cb;
        var lv = new osgAnimation.LinkVisitor();
        lv.setAnimationMap(animationManager.getAnimationMap());
        result.accept(lv);
        animationManager.buildTargetList();
        ok(animationManager._targets.length === 4, "Check targets");

        animationManager.playAnimation("Cube");
        animationManager.updateManager(0);
        animationManager.updateManager(0.5);
        osg.log("value " + animationManager._targets[0].getValue());
        animationManager.updateManager(1.0);
        ok(check_near(animationManager._targets[0].getValue(), [1.085831578947368, 0, 0]) , "Check animation loop result");

        animationManager.stopAnimation("Cube");
        animationManager.updateManager(2.0);
        animationManager.playAnimation({ name: "Cube", loop: 1 } );
        animationManager.updateManager(2.5);
        osg.log("value " + animationManager._targets[0].getValue());
        animationManager.updateManager(3.0);
        ok(animationManager.isPlaying("Cube"), false, "Check animation is not active");
        ok(check_near(animationManager._targets[0].getValue(), [2.6797789473684217, 0, 0]) , "Check animation once result");

    }