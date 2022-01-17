function deviceOrientationHandler(tiltLR, tiltFB, dir, motionUD) {
    var data = {
       'tiltLR': tiltLR, 
       'tiltFB': tiltFB,
       'dir': dir,
       'motionUD': motionUD
    };
    socket.emit('orientation', data);
    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(dir);
    document.getElementById("doMotionUD").innerHTML = motionUD;
}