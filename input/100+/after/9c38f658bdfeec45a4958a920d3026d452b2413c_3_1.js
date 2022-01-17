function (array, callbackType) {
        if (!array || array.length == 0)
            return;

        var i;
        switch (callbackType) {
            case cc.Node.StateCallbackType.onEnter:
                for (i = 0; i < array.length; i++) {
                    if (array[i])
                        array[i].onEnter();
                }
                break;
            case cc.Node.StateCallbackType.onExit:
                for (i = 0; i < array.length; i++) {
                    if (array[i])
                        array[i].onExit();
                }
                break;
            case cc.Node.StateCallbackType.onEnterTransitionDidFinish:
                for (i = 0; i < array.length; i++) {
                    if (array[i])
                        array[i].onEnterTransitionDidFinish();
                }
                break;
            case cc.Node.StateCallbackType.cleanup:
                for (i = 0; i < array.length; i++) {
                    if (array[i])
                        array[i].cleanup();
                }
                break;
            case cc.Node.StateCallbackType.onExitTransitionDidStart:
                for (i = 0; i < array.length; i++) {
                    if (array[i])
                        array[i].onExitTransitionDidStart();
                }
                break;
            case cc.Node.StateCallbackType.sortAllChildren:
                for (i = 0; i < array.length; i++) {
                    if (array[i])
                        array[i].sortAllChildren();
                }
                break;
            default :
                throw "Unknown callback function";
                break;
        }
    }