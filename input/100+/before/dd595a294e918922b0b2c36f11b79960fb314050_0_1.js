function(time, index, msg) {
    $('#t_alt').html(msg.alt.toPrecision(4));
    $('#t_gspd').html(msg.groundspeed.toPrecision(2));
    $('#t_aspd').html(msg.airspeed.toPrecision(2));
    $('#t_hdg').html(msg.heading);
    mmap.rotateDrone(msg.heading);
    mmap.adi.setSpeed(msg.groundspeed);
    mmap.adi.setTargetSpeed(11);
    mmap.adi.setAltitude(msg.alt);
    mmap.adi.setTargetAltitude(15);
}