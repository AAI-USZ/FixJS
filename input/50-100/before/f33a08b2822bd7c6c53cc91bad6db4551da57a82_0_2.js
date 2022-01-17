function(pos) {
      if (pos == null) {
        pos = SNAKE.Utils.randPair(this.squaresX - 1, this.squaresY - 1);
      }
      this.foodItems.enqueue(pos);
      if (this.foodCount > this.maxFood) {
        return this.foodItems.dequeue();
      }
    }