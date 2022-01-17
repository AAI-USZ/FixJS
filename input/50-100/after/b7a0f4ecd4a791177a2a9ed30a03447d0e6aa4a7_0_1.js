function Player(room, start_location, context) {
    this.room = room;
    this.start_location = start_location;
    this.context = context;
    this.location = start_location;
    this.move([0,0]);
}