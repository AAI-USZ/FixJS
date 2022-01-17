function(time, index, msg) {
    if (Math.abs(msg.alt_error) > 0) {
        mmap.adi.setTargetAltitude(mmap.altitude + msg.alt_error);
    }
    if (Math.abs(msg.aspd_error) > 0) {
        mmap.adi.setTargetSpeed(mmap.airspeed + msg.aspd_error);
    }
}