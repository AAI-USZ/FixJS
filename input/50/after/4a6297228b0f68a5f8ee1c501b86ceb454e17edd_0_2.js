function generateRandomIngredients() {
    for (var i = 0; i < spawns.length; i++) {
        spawns[i] = ingredients[Math.ceil(Math.random() * 6)];
    }
}