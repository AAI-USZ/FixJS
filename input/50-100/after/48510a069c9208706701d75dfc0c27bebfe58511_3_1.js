function () {
    this.css("top", Math.max(( $(window).height() - this.height() ) / 2+$(window).scrollTop(), 10) + "px");
    this.css("left", Math.max(( $(window).width() - this.width() ) / 2+$(window).scrollLeft(), 10) + "px");
    return this;
}