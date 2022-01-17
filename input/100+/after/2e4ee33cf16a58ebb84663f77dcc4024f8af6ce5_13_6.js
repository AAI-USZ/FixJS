function() {
    var tree = {
        "osg.Node": {
            "Name": "Root", 
            "UpdateCallbacks": [ {
                "osgAnimation.BasicAnimationManager": {
                    "Animations": [ {
                        "osgAnimation.Animation": {
                            "Name": "Test",
                            "Channels": [ {
                                "osgAnimation.Vec3LerpChannel": {
                                    "Name": "translate", 
                                    "KeyFrames": [ [ 0, 
                                                     -15.7923, 
                                                     781.26, 
                                                     136.075 ] ], 
                                    "TargetName": "Zeppelin_2"
                                }
                            }, {
                                "osgAnimation.Vec3LerpChannel": {
                                    "Name": "scale", 
                                    "KeyFrames": [ [ 0, 
                                                     1, 
                                                     1, 
                                                     1 ], 
                                                   [ 39.96, 
                                                     1, 
                                                     1, 
                                                     1 ] ], 
                                    "TargetName": "Zeppelin_2"
                                }
                            } ]
                        }
                    } ]
                }
            } ]
        }
    };
    osgDB.Promise.when((new osgDB.Input()).setJSON(tree).readObject()).then(function(result) {
        ok(result.getUpdateCallbackList().length === 1, "check update callback");

        ok(result.getUpdateCallback().getAnimationMap().Test !== undefined, "check animation list");
        var animation =  result.getUpdateCallback().getAnimationMap().Test;
        ok(animation !== undefined, "check animation");        
        ok(animation.getChannels().length === 2, "check channels");
        ok(animation.getChannels()[1].getName() === "scale", "check channel 1");
        ok(animation.getChannels()[1].getTargetName() === "Zeppelin_2", "check taget channel 1");
        ok(animation.getChannels()[1].getSampler().getKeyframes().length === 2, "check keyframes on channel 1");
        start();
    });

}