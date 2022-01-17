function hasSolution(room, location) {
    var activated = room.activate(location);
    if (!activated) {
        return false;
    }
    if (room.isComplete()) {
        return true;
    }
    var x = location[0], y = location[1];
    result = (hasSolution(room, [x+1,y]) ||
              hasSolution(room, [x-1,y]) ||
              hasSolution(room, [x,y+1]) ||
              hasSolution(room, [x,y-1]));
    if (!result) {
        room.deactivate(location);
    }
    return result;
}