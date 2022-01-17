function() {
            osgDB.Promise.when(osgDB.parseSceneGraph(getOgre())).then(function(model) {
                var project = createProjectedShadowScene(model);
                project.setMatrix(osg.Matrix.makeTranslate(-10,0,0.0,[]));
                root.addChild(project);
            });
        }