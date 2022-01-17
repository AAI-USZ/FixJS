function Waiter() {
    var self = this;

    // found values
    self.values = {};

    // callback when done
    self.callback = null;

    self.resolved = false;

    self.count = 0;
}