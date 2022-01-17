function (snake, action) {
    if (action === "reset") {
        Snake.reset(snake);
    } else {
        snake.targetDirection = action;
    }
}