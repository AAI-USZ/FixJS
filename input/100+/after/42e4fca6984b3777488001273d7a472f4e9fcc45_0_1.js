function (width, height) {
    var moves = new Snake.Moves(width, height),
        snake = new Snake.Snake(5, [4, 3, 2, 1], "right"),
        arena = Snake.createArena(width, height),
        intervalId;

    Snake.paintSnake(snake);
    window.onkeydown = Snake.makeKeyDownListener(snake);
    arena.addEventListener("died", function() {
        window.clearInterval(intervalId);
    });
    intervalId = window.setInterval(Snake.moveAndRepaintSnake, 500, snake, moves);
}