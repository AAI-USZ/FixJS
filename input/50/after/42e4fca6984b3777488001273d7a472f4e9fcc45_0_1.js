function (head, tail, direction) {
    this.head = head;
    this.trail = [];
    this.direction = direction;
    this.targetDirection = direction;
    this.tail = tail;
    this.length = tail.length;
}