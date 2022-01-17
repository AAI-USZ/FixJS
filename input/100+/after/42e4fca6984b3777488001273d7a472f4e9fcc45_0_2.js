function (snake, moves) {
    var move = moves[snake.targetDirection],
        head = snake.head,
        tail = snake.tail;

    snake.direction = snake.targetDirection;
    if (snake.length <= tail.length) {
        snake.trail = [tail.pop()];
    }
    tail.unshift(head);
    snake.head = move(head);
    if (tail.indexOf(snake.head) !== -1) {
        document.getElementById("arena").dispatchEvent(new CustomEvent("died"));
    }
}