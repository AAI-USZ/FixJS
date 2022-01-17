function setupScene() {

    var rad = toRad(lightAngle);
    var lightX = ((Math.cos(rad) * (DEPTH_OF_FIELD/2)));
    var lightZ = ((Math.sin(rad) * (DEPTH_OF_FIELD/2)));
    
    lightLocation[0] = lightX;
    lightLocation[1] = (DEPTH_OF_FIELD/2);
    lightLocation[2] = lightZ;

    normalize(subtract(setTo(lightDirection, NUL), lightLocation));
    
    var viewRad = toRad(viewAngle);
    var viewX = ((Math.cos(viewRad) * (DEPTH_OF_FIELD/2)));
    var viewZ = ((Math.sin(viewRad) * (DEPTH_OF_FIELD/2)));
    
    nearFieldLocation[0] = viewX;
    nearFieldLocation[1] = 0.0;
    nearFieldLocation[2] = viewZ;

    normalize(subtract(setTo(viewDirection, NUL), nearFieldLocation));

    scalarMultiply(setTo(reverseDirection, viewDirection), eyeDistanceFromNearField);
    subtract(setTo(eyeLocation, nearFieldLocation), reverseDirection);
}