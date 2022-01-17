function(pitch, roll) {
        theADI.targetPitch = pitch;
        theADI.targetRoll = roll;
        MM.getFrame(theADI.animateToAttitude);
    }