function (flag) {
    this.highlighted = flag;
    this.updateIcon();
    komoo.event.trigger(this, 'highlight_changed', flag);
}