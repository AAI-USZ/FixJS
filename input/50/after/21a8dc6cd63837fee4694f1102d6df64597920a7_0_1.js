function taylorKO(bWeight, bDiameter, bFPS){
    bweight = parseInt(bWeight);
    bDiameter = parseFloat(bDiameter);
    bFPS = parseInt(bFPS);
    return (bWeight * bDiameter * bFPS)/7000;
}