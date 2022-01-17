function Player(room, start_location) {
    this.room = room;
    if (typeof start_location === 'undefined') {
        start_location = [0,0];
    }
    this.start_location = start_location;
    this.location = start_location;
    this.move([0,0]);
}