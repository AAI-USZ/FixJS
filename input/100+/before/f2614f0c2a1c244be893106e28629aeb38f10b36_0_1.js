function(animated) {
    if ( ! this._canvas ) {
        return;
    }

    var layer_containers = this._layer_containers || [];

    var RS = this._RS;
    var track_heights = 0;
    var order = this.trackOrder || [];
    
    if (this.navigation) {
        this.navigation.reset();
    }
    for (var i = 0; i < order.length; i++ ) {
        
        var name = order[i];
        var container = layer_containers[name];
        if ( ! container ) {
            continue;
        }
        var y_val;
        if (! this.isLayerActive(name)) {
            var attrs = { 'y' : -1*(this._axis_height)*RS, 'height' :  RS * container.track_height / this.zoom ,'visibility' : 'hidden' };
//            var attrs = { 'y' : (this._axis_height  + (track_heights - container.track_height )/ this.zoom)*RS, 'height' :  RS * container.track_height / this.zoom ,'visibility' : 'hidden' };
            if (MASCP.getLayer(name).group) {
                var controller_track = this.navigation.getController(MASCP.getLayer(name).group);
                if (controller_track && this.isLayerActive(controller_track)) {
                    attrs.y = layer_containers[controller_track.name].currenty();
                }
            }
            
            if (container.fixed_track_height) {
                delete attrs.height;
            }

            if (animated) {                
                container.animate(attrs);
            } else {
                container.attr(attrs);
            }
            if (container.tracers) {
            }
            continue;
        } else {
            container.attr({ 'opacity' : '1' });
        }
        if (container.tracers) {
            var disp_style = (this.isLayerActive(name) && (this.zoom > 3.6)) ? 'visible' : 'hidden';
            var height = (1.5 + track_heights / this.zoom )*RS;
            
            if (container.fixed_track_height) {
                height += 0.5*container.fixed_track_height * RS;
            }
            if(animated) {
                container.tracers.animate({'visibility' : disp_style , 'y' : (this._axis_height - 1.5)*RS,'height' : height });
            } else {
                container.tracers.attr({'visibility' : disp_style , 'y' : (this._axis_height - 1.5)*RS,'height' : height });                
            }
        }
        if (container.fixed_track_height) {

            var track_height = container.fixed_track_height;

            y_val = this._axis_height + (track_heights  - track_height*0.3) / this.zoom;

            if (animated) {
                container.animate({ 'visibility' : 'visible','y' : (y_val)*RS });
            } else {
                container.attr({ 'visibility' : 'visible','y' : (y_val)*RS });                
            }
            
            if (this.navigation) {
                var grow_scale = this.grow_container ? 1 / this.zoom : 1;
                this.navigation.renderTrack(MASCP.getLayer(name), (y_val)*RS , RS * track_height, { 'font-scale' : (container.track_height / track_height) * 3 * grow_scale } );
            }
            track_heights += (this.zoom * track_height) + this.trackGap;
        } else {
            y_val = this._axis_height + track_heights / this.zoom;
            if (animated) {
                container.animate({ 'visibility': 'visible', 'y' : y_val*RS, 'height' :  RS * container.track_height / this.zoom });
            } else {
                container.attr({ 'visibility': 'visible', 'y' : y_val*RS, 'height' :  RS * container.track_height / this.zoom });                
            }
            if (this.navigation) {
                y_val -= 1*container.track_height/this.zoom;
                this.navigation.renderTrack(MASCP.getLayer(name), y_val*RS , RS * 3 * container.track_height / this.zoom );
                track_heights += container.track_height;
            }
            track_heights += container.track_height + this.trackGap;
        }

        container.refresh_zoom();

    }

    var viewBox = [-1,0,0,0];
    viewBox[0] = -2*RS;
    viewBox[2] = (this.sequence.split('').length+(this.padding)+2)*RS;
    viewBox[3] = (this._axis_height + (track_heights / this.zoom)+ (this.padding))*RS;
    this._canvas.setAttribute('viewBox', viewBox.join(' '));
    this._canvas._canvas_height = viewBox[3];


    var outer_viewbox = [].concat(viewBox);

    outer_viewbox[0] = 0;
    outer_viewbox[2] = (this.zoom)*(2*this.sequence.length)+(this.padding);
    outer_viewbox[3] = (this.zoom)*2*(this._axis_height + (track_heights / this.zoom)+ (this.padding));
    if (! this.grow_container ) {
        this._container_canvas.setAttribute('viewBox', outer_viewbox.join(' '));
    }

    this._resizeContainer();

    viewBox[0] = 0;
    if (this.navigation) {

        if (this.navigation.visible()) {
            this._canvas.style.GomapScrollLeftMargin = 100 * RS / this.zoom;
        } else {
            this._canvas.style.GomapScrollLeftMargin = 1000;            
        }
        this.navigation.setViewBox(viewBox.join(' '));
    }

    if (this.navigation) {
        this.navigation.refresh();
    }

}