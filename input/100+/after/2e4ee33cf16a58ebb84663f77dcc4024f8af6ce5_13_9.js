function(result) {
        ok(result.getUpdateCallbackList().length === 1, "check osgAnimation.UpdateMatrixTransform callback");
        ok(result.getUpdateCallback().getStackedTransforms().length === 5, "check osgAnimation.UpdateMatrixTransform stacked transform");
        start();
    }