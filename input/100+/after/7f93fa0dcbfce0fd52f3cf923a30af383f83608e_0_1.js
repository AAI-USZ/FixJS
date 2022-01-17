function(raw, into, index) {
        // NOTE: Partial, doesn't set all values.
        into.leftStickX = raw.axes[0];
        into.leftStickY = raw.axes[1];
        into.rightStickX = raw.axes[2];
        into.faceButton0 = raw.buttons[14];
        into.faceButton1 = raw.buttons[13];
        into.faceButton2 = raw.buttons[15];
        into.faceButton3 = raw.buttons[12];
        into.leftShoulder0 = raw.buttons[10];
        into.rightShoulder0 = raw.buttons[11];
        into.leftShoulder1 = raw.buttons[8];
        into.rightShoulder1 = raw.buttons[9];
        into.select = raw.buttons[0];
        into.start = raw.buttons[3];
        into.leftStickButton = raw.buttons[1];
        into.rightStickButton = raw.buttons[2];
        into.dpadUp = raw.buttons[4];
        into.dpadDown = raw.buttons[6];
        into.dpadLeft = raw.buttons[7];
        into.dpadRight = raw.buttons[5];
    }