function(result) {
        ok(result.getKeyframes().length === 2, "Check keyframes QuatLerpChannel");
        ok(result.getTargetName() === "Cube", "Check TargetName QuatLerpChannel");
        ok(result.getName() === "quaternion", "Check Name QuatLerpChannel");
        start();
    }