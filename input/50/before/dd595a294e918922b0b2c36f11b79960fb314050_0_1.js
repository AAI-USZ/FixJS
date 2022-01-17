function(time, index, msg) {
    if (!mmap.clientWaypointSeq || mmap.clientWaypointSeq < index) {
	mmap.clientWaypointSeq = index;
	mmap.newWaypoint(msg.waypoint);
    }
}