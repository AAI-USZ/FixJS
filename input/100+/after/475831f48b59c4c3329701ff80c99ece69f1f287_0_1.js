function (step) {
            if (lastEntered !== step) {
                triggerEvent(step, "impress:stepgoto");
            }
        }