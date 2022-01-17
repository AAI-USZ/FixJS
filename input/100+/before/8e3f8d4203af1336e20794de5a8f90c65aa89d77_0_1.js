function Overlay(m, server_object) {
    /* server_object contains:
        name,
        description,
        default_creation_options,
        kind,
        resource_uri,
        roles
     */

    var layer;
    var update_interval;
    var options = {};
    var share_button;
    var overlay_button;
    var overlay_elements;
    var active = false;
    var sharing = false;

    switch(server_object.kind) {
        case 'WMS':
            eval("options=" + server_object.default_creation_options + ";");
            layer = new OpenLayers.Layer.WMS(server_object.name, options.url, options, options);
            break;
        case 'WFS':case 'GeoJSON':
            eval("options=" + server_object.default_creation_options + ";");
            options.renderers = ['Canvas','SVG','VML'];
            layer = new OpenLayers.Layer.Vector(server_object.name, options);
            break;
        default:
            console.log(server_object.kind);
    }

    function update() {
        switch(server_object.kind) {
            case 'WMS':
                layer.mergeNewParams({});
                break;
            default:
                layer.refresh();
        }
    }

    function markShared() {
        if(!sharing) activate();
        sharing = true;
        share_button.parent().addClass('ui-btn-active');
    }

    function markNotShared() {
        sharing = false;
        share_button.parent().removeClass('ui-btn-active');
    }


    function share() {
        if(!active) {
            activate();
        }
        if(!sharing) {
            markShared();
            bb.shareLayer(server_object);
        }
    }

    function unshare() {
        if(sharing) {
            markNotShared();
            bb.unshareLayer(server_object);
        }
    }

    function toggleSharing() {
        if(sharing)
            unshare();
        else
            share();
    }

    function adjustOrder(zorder) {
        m.raiseLayer(layer, zorder);
    }

    function activate() {
        active = true;
        layer.setVisibility(true);
        overlay_button.parent().addClass('ui-btn-active');
    }

    function deactivate() {
        active = false;
        layer.setVisibility(false);
        overlay_button.parent().removeClass('ui-btn-active');
    }

    function toggle() {
        if(active)
            deactivate();
        else
            activate();
    }

    function pause() {
        if(update_interval)
            clearInterval(update_interval);
    }

    function unpause() {
        if(options.update_interval)
            update_interval = setInterval(update(), options.update_interval);
    }

    // start animation if there is any.
    unpause();

    // add this overlay to the list of overlays
    overlay_elements = $("#overlay_base").clone();
    overlay_elements.show();
    overlay_elements.attr('id',null);
    overlay_button = $(".overlay_name", overlay_elements);
    share_button = $(".overlay_share", overlay_elements);
    $('.ui-btn-text', overlay_button.parent()).html(server_object.name);
    overlay_elements.toggle('refresh');
    overlay_button.click(toggle);
    share_button.click(toggleSharing);
    $("#overlays").append(overlay_elements);
    m.addLayers([layer]);
    deactivate();

    return $.extend(server_object, {
        layer : layer,
        update: update,
        share:  share,
        unshare: unshare,
        markShared: markShared,
        markNotShared: markNotShared,
        adjustOrder: adjustOrder,
        pause: pause,
        unpause:unpause,
        activate: activate,
        deactivate: deactivate,
        toggle: toggle
    });
}