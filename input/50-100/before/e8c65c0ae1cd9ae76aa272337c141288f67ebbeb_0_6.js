function() {
      this.resetFoodInterval();
      this.foodItems.enqueue(Game.Utils.randPair(this.squaresX - 1, this.squaresY - 1));
      if (this.foodCount > this.maxFood) return this.foodItems.dequeue();
    }