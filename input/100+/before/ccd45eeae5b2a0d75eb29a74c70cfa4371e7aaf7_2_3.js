function () {
    var that = this;
    this.title = $('<div>');
    this.body = $('<div>');
    this.content = $('<div>').addClass('map-infowindow-content');
    this.content.append(this.title);
    this.content.append(this.body);
    this.infoBox_.setContent(this.content.get(0));
    var css = {
        background: 'white',
        padding: '10px',
        margin: '0 0 0 15px'
    };
    this.content.css(css);
    this.content.hover(
        function (e) {
            that.isMouseover = true;
        },
        function (e) {
            that.isMouseover = false;
        }
    );
}