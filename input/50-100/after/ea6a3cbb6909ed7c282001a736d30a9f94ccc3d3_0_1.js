function () {
        var thisStep = currentStep++;
        if (thisStep < todo.length)
            todo[thisStep]();
        else if (thisStep == todo.length)
            setTimeout(function () { finishJSTest(); }, 0); // Deferred so that excessive doNextStep calls will be observed.
        else
            testFailed("doNextStep called too many times.");
    }