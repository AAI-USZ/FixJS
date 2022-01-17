function() {
        var tree = {
            "osgAnimation.QuatLerpChannel": {
                "Name": "quaternion", 
                "TargetName": "Cube", 
                "KeyFrames": [
                    [ -0.04, 0 , 0, 0, 1],
                    [ 0.36, -0 , 0, 0, 1] ]
            }
        };

        var result = (new osgDB.Input()).setJSON(tree).readObject();
        ok(result.getKeyframes().length === 2, "Check keyframes QuatLerpChannel");
        ok(result.getTargetName() === "Cube", "Check TargetName QuatLerpChannel");
        ok(result.getName() === "quaternion", "Check Name QuatLerpChannel");
    }