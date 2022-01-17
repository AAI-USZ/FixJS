function (charger, battery) {
    
    var getBattery;
    if (charger === true && battery === true) {
        getBattery = true;
    }   else {
        getBattery = false;
    }   return getBattery;
}