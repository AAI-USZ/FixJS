function () {
    for (var m in this.modelMap) {
        this.modelMap[m].primitive.built = false;
    }

    return JSON.stringify(this.modelMap);
}