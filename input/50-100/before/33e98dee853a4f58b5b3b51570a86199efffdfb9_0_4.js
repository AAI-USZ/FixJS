function(time, index, msg) {
    mmap.adi.setTargetAltitude(mmap.altitude + msg.alt_error);
    mmap.adi.setTargetSpeed(mmap.airspeed + msg.aspd_error);
}