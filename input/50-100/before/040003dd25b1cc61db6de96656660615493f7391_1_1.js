function (opts) {
    var infoWindowOptions = {
        pixelOffset: new google.maps.Size(0, -20),
        closeBoxMargin: '10px',
        boxStyle: {
            cursor: 'pointer',
            background: 'url(/static/img/infowindow-arrow.png) no-repeat 0 10px',  // FIXME: Hardcode is evil
            width: '200px'
        }
    };
    this.object_ = new InfoBox(infoWindowOptions);
    this.customize_();
}