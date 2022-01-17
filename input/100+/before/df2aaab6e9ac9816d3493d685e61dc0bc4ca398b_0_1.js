function move() {
        var move = moves[elements.targetDirection],
            head = elements.head,
            tail = elements.tail,
            newHead = move(head);

        if (elements.isDead) {
            return;
        }
        if (newHead === elements.food) {
            elements.length += 1;
            generateFood();
            setScore();
            if (((elements.length % 8) === 0) && (interval > 10)) {
                window.clearInterval(intervalId);
                interval -= 10;
                intervalId = window.setInterval(moveAndPaintAll, interval);
            }
        }
        elements.direction = elements.targetDirection;
        if (elements.length <= tail.length) {
            elements.trail = tail.shift();
        }
        tail.push(head);
        elements.head = newHead;
        if (tail.indexOf(newHead) !== -1) {
            elements.isDead = true;
        }
    }