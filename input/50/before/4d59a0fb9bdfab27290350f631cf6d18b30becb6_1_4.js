function (flag) {
    if (this.geometry_.setEditable) {
        return this.geometry_.setEditable(flag);
    } else if (this.geometry_.setDraggable) {
        return this.geometry.setDraggable(flag);
    }
}