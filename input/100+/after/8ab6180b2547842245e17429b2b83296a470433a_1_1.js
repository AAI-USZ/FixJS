function() {

    // Convert the old URL params to hash
    if (getUrlVars()["matid"]) {
        var matid = getUrlVars()["matid"];
        var cat = getUrlVars()["category"] || "";
        window.location.replace("./#/" + matid + "/" + cat);
    }


    // jQuery UI Accordion
    theHash = window.location.hash.split("/");
    $('#accordion-data').accordion({
        header: "h3",
        active: theHash[2] && $("#accordion-data h3").index($("h3#" + theHash[2] )) !== -1 ? $("#accordion-data h3").index($("h3#" + theHash[2])) : 0,
        collapsible: true,
        autoHeight: false,
        create: function(event, ui) {
            $(this).fadeIn("slow");
        }
    }).bind("accordionchange", function(event, ui) {
        if (ui.newHeader[0]) $.publish("/change/accordion", [ui.newHeader[0].id]);
    });

    // jQuery UI Dialogs
    $("#search-dialog").dialog({
        width: 400,
        autoOpen: false,
        show: 'fade',
        hide: 'fade',
        open: function(event, ui) { $("#search-dialog-video").html('<iframe width="350" height="262" src="http://www.youtube-nocookie.com/embed/aGlmVQXRRj4?rel=0" frameborder="0" allowfullscreen></iframe>'); },
        close: function(event, ui) { $("#search-dialog-video").empty(); }
    });
    $("#help-dialog").dialog({
        width: 670,
        autoOpen: false,
        show: 'fade',
        hide: 'fade',
        open: function(event, ui) { $("#help-dialog-video").html('<iframe width="640" height="480" src="http://www.youtube-nocookie.com/embed/O3S3QobjONM?rel=0" frameborder="0" allowfullscreen></iframe>'); },
        close: function(event, ui) { $("#help-dialog-video").empty(); }
    });
    $("#new-dialog").dialog({
        width: 380,
        autoOpen: false,
        show: 'fade',
        hide: 'fade'
    });
    $("#welcome-dialog").dialog({
        width: 550,
        autoOpen: false,
        show: 'fade',
        hide: 'fade'
    });
    $("#buffer-dialog").dialog({
        width: 280,
        height: 135,
        autoOpen: false,
        position: [485, 120],
        show: 'fade',
        hide: 'fade'
    });
    if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
        $("#gcf-dialog a").button();
        $("#gcf-dialog").dialog({
            width: 550,
            autoOpen: true,
            show: 'fade',
            hide: 'fade',
            modal: true
        });
    }
    $("#gallery-dialog").dialog({
        width: 500,
        minHeight: 400,
        autoOpen: false,
        show: 'fade',
        hide: 'fade'
    });
    $("#problem-dialog").dialog({
        minWidth: 600,
        minHeight: 400,
        autoOpen: false,
        show: 'fade',
        hide: 'fade',
        modal: true
    });
    $("#photo-dialog").dialog({
        minWidth: 500,
        minHeight: 400,
        autoOpen: false,
        show: 'fade',
        hide: 'fade',
        modal: true
    });

    // Click events
    $(".searchoptions").click(function() {
        $('#search-dialog').dialog('open');
    });
    $(".video_tutorial").click(function() {
        $('#help-dialog').dialog('open');
    });
    $("#whatsnew").click(function() {
        $('#new-dialog').dialog('open');
    });
    $(".report_data_error").on("click", function(event) {
        url = "http://maps.co.mecklenburg.nc.us/report_data_problems/report_data_errors.php";
        if (selectedAddress) url += "?extradata=" + selectedAddress.address;
        $("#problem-dialog").html('<iframe src="' + url + '" style="width: 600px; min-height: 500px; border: none;"></iframe>');
        $("#problem-dialog").dialog("open");
    });
    $(".toggleLayer").on("click", function() {
        toggleLayer($(this).data("layer"));
    });
    $("#routeGo").on("click", function() {
        calcRoute();
    });
    $("#routeClear").on("click", function() {
        directionsDisplay.setDirections({
            routes: []
        });
    });
    $("#photo_gallery").on("click", "img", function(event) {
        $(".house_photo").removeClass("house_photo_selected");
        $(this).addClass("house_photo_selected");
        $("#gallery-dialog").html('<img src="' + $(this).prop("src") + '" style="width: 100%" /><h3>' + $(this).data("date") + ' from ' + $(this).data("attribution") + '</h3>');
        $("#gallery-dialog").dialog("open");
    });
    $("#housephoto").on("click", "#newphoto", function(event) {
        url = "http://maps.co.mecklenburg.nc.us/house_photos/index.php?pid=" + selectedAddress.parcelid;
        $("#photo-dialog").html('<iframe src="' + url + '" style="width: 450px; min-height: 500px; border: none;"></iframe>');
        $("#photo-dialog").dialog("open");
    });
    $("#searchinput").click(function() {
        $(this).select();
    });
    $(".selectedLocation").on("click", "a", function() {
        args = $(this).data("panzoom").split(',');
        $.publish("/map/panzoom", [{
            "lon": args[0],
            "lat": args[1],
            "zoom": args[2]
        }]);
    });
    $(".datatable").on("click", "a.locate", function() {
        coords = $(this).data("coords").split(",");
        $.publish("/layers/addmarker", [{
            "lon": coords[0],
            "lat": coords[1],
            "featuretype": 1,
            "label": $(this).data("label"),
            "zoom": map.getZoom()
        }]);
    });
    $(".datatable").on("click", "a.routeLink", function() {
        $("#routeTo").val($(this).data("route"));
        $('#accordion-data').accordion('activate', '#ROUTING');
        calcRoute();
    });

    //  Map toolbar
    $("#mapcontrols").buttonset();
    $("#mapcontrols input:radio").click(function() {
        toolbar($(this));
    });
    $("#toolbar").fadeIn("slow");

    // Buttons
    $("#routeGo, #newphoto, #routeClear").button();

    // URL Hash Change Handler
    $(window).hashchange(function() {
        // hash[0] is junk(#), hash[1] is active record, hash[2] is active tab
        theHash = window.location.hash.split("/");

        if (theHash[1] && theHash[1] != selectedAddress.objectid) {
            locationFinder("Address", 'master_address_table', 'objectid', theHash[1]);
        }
        if (theHash[2] && theHash[2] != $("#accordion-data h3").eq($('#accordion-data').accordion('option', 'active')).prop("id")) {
            $('#accordion-data').accordion('activate', '#' + theHash[2]);
        }

    });

    // Inital PubSub Subscriptions
    $.subscribe("/change/hash", changeHash); // Hash change control
    $.subscribe("/change/selected", accordionDataClearShow); // Selected record change
    $.subscribe("/change/selected", setSelectedAddress); // Selected record change
    $.subscribe("/change/selected", setLocationText); // Selected record change
    $.subscribe("/change/selected", zoomToLonLat); // Zoom to Location
    $.subscribe("/change/selected", addMarker); // Add Marker
    $.subscribe("/change/accordion", processAccordionDataChange); // Change accordion
    $.subscribe("/layers/addmarker", zoomToLonLat); // Zoom to location
    $.subscribe("/layers/addmarker", addMarker); // Add marker
    $.subscribe("/map/panzoom", zoomToLonLat); // Zoom to location

    // jQuery UI Autocomplete
    $("#searchinput").autocomplete({
        minLength: 4,
        delay: 400,
        autoFocus: true,
        source: function(request, response) {

            $.ajax({
                url: config.web_service_base + "v2/ws_geo_ubersearch.php",
                dataType: "jsonp",
                data: {
                    searchtypes: "Address,Library,School,Park,GeoName,Road,CATS,Intersection,PID",
                    query: request.term
                },
                success: function(data) {
                    if (data.total_rows > 0) {
                        response($.map(data.rows, function(item) {
                            return {
                                label: urldecode(item.row.displaytext),
                                value: item.row.displaytext,
                                responsetype: item.row.responsetype,
                                responsetable: item.row.responsetable,
                                getfield: item.row.getfield,
                                getid: item.row.getid
                            };
                        }));
                    } else if (data.total_rows == 0) {
                        response($.map([{}], function(item) {
                            return {
                                // No records found message
                                label: "No records found.",
                                responsetype: "I've got nothing"
                            };
                        }));
                    } else if (data.total_rows == -1) {
                        response($.map([{}], function(item) {
                            return {
                                // Message indicating no search performed
                                label: "More information needed for search.",
                                responsetype: "More please"
                            };
                        }));
                    }

                }
            });
        },
        select: function(event, ui) {
            $("#searchinput").autocomplete('widget').trigger('mousedown.choose_option');
            // Run function on selected record
            if (ui.item.responsetable) {
                locationFinder(ui.item.responsetype, ui.item.responsetable, ui.item.getfield, ui.item.getid, ui.item.value);
            }
        },
        open: function(event, ui) {
            // get enter/return for stubborn browsers
            $(this).keypress(function(e) {

                if (e.keyCode == 13 || e.keyCode == 39) {
                    $($(this).data('autocomplete').menu.active).find('a').trigger('click');
                }
            });
            // Go if only 1 result
            menuItems = $("ul.ui-autocomplete li.ui-menu-item");
            if (menuItems.length == 1 && menuItems.text() != "More information needed for search." && menuItems.text() != "No records found.") {
                $($(this).data('autocomplete').menu.active).find('a').trigger('click');
            }
        }
    }).data("autocomplete")._renderMenu = function(ul, items) {
        var self = this,
            currentCategory = "";
        $.each(items, function(index, item) {
            if (item.responsetype != currentCategory && item.responsetype !== undefined) {
                ul.append("<li class='ui-autocomplete-category'>" + item.responsetype + "</li>");
                currentCategory = item.responsetype;
            }
            self._renderItem(ul, item);
        });
    };

}