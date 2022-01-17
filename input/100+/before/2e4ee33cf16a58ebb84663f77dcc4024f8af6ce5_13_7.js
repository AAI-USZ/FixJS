function() {
        var tree = {
            "osgAnimation.FloatLerpChannel": {
                "Name": "euler_x", 
                "TargetName": "Cube", 
                "KeyFrames": [
                    [ -0.04, 0],
                    [ 0.36, -0] ]
            }
        };

        var result = (new osgDB.Input()).setJSON(tree).readObject();
        ok(result.getKeyframes().length === 2, "Check keyframes FloatLerpChannel");
        ok(result.getTargetName() === "Cube", "Check TargetName FloatLerpChannel");
        ok(result.getName() === "euler_x", "Check Name FloatLerpChannel");

    }