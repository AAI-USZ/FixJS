function (enabled) {
    this.jarkusPanel.setDisabled(!enabled);
    if (enabled)
        this.jarkusPanel.expand();
    else
        this.jarkusPanel.collapse();
}