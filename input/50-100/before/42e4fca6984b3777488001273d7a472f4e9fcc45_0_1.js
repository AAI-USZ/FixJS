function (snake) {
    var tiles = document.getElementById("arena").children;
    function changeClass(index, className) {
        tiles[index].className = className;
    }
    changeClass(snake.head, "head");
    snake.tail.forEach(function (tailIndex) {
        changeClass(tailIndex, "tail");
    });
    snake.trail.forEach(function (trailIndex) {
        changeClass(trailIndex, "trail");
    });
}