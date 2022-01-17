function init(callback) {
        // Unsaved changes dialog handler
        $(window).bind("beforeunload", function() {
            updateViewData();
            var newvdata = JSON.stringify(VIEWS.data);
            if (loadedViewStr != newvdata) {
                hasUnsavedChanges = true;
            }

            if (hasUnsavedChanges) {
                return "You have unsaved changes";
            }
        });
        $("form").submit(function() {
            $(window).unbind("beforeunload");
        });

        // Deal with window resize events
        TOOLS.onWindowResizeResizeElementHeight("#_timeline_addChannelsArea #_timeline_sources_list");
        TOOLS.onWindowResizeResizeElementHeight("#_timeline_channelsWrapper");
        TOOLS.onWindowResizeListener(function() {
            // borderOffset is used to account for:
            // * 1 pixel of border on #_timeline_channels
            // * 1 pixel of border on ._timeline_channel
            var borderOffset = 2;

            var widthOfAreaLeftOfPlotContainer = $("._timeline_channeltd").width() + borderOffset;
            var widthOfAreaRightOfPlotContainer = $("._timeline_yaxistd").width() + borderOffset;

            // the .plotContainer has a 1 pixel border around it, so set this to 2 to account for the left and right sides
            var widthOfPlotContainerLeftAndRightBorder = 2;

            // compute the desired size of plot containers based on the current width of the _timeline_channelsArea (which
            // will automatically shrink if the Add Channels and/or Details pane is visible, so we don't explicitly need
            // to account for them here).
            var plotContainerWidth = $("#_timeline_channelsArea").width() - widthOfAreaLeftOfPlotContainer - widthOfAreaRightOfPlotContainer - widthOfPlotContainerLeftAndRightBorder - 20;

            // resize plot containers
            var plotContainerEventId = SequenceNumber.getNext();
            for (var i = 0; i < plotContainers.length; i++) {
                var plotContainerHeight = $("#" + plotContainers[i].getPlaceholder()).height();
                plotContainers[i].setSize(plotContainerWidth, plotContainerHeight, plotContainerEventId);
            }

            // resize date axis
            if (dateAxis) {
                dateAxis.setSize(plotContainerWidth, $("#_timeline_dateAxis").height(), SequenceNumber.getNext());
            }

            // resize y axes
            var yAxisWidth = $("._timeline_yAxis").width();
            for (var plotKey in plotsMap) {
                var plot = plotsMap[plotKey];
                if (plot) {
                    var yAxis = plot.getVerticalAxis();
                    var yAxisHeight = $("#" + yAxis.getPlaceholder()).height();
                    if (yAxis) {
                        yAxis.setSize(yAxisWidth, yAxisHeight);
                    }
                }
            }
        });

        // Make the channel list sortable
        $("#_timeline_channels").sortable({
            handle      : '._timeline_channelTab',
            axis        : 'y',
            tolerance   : 'pointer',
            containment : '#_timeline_channels',
            merge		: function(event, ui) {
            	var templateValues = {
                        "deviceName"       : "Devices",
                        "channelName"      : "Compare Stub",
                        "plotElementId"    : "_timeline_channel_helper",
                        "channelElementId" : "_timeline_plot_helper",
                        "yAxisElementId"   : "_timeline_yAxis_helper"
            	};
            	var html = Hogan.compile($("#_timeline_channel_template").html()).render(templateValues);
                    
            	$(ui.item[0]).remove();
            	$(ui.droppable.item[0]).replaceWith(html);
            },
            mergein		: function(event, ui) {
            	$(ui.droppable.item[0]).addClass("_timeline_channel_hover");
            },
            mergeout	: function(event, ui) {
            	$(ui.droppable.item[0]).removeClass("_timeline_channel_hover");
            },
            receive     : function(event, ui) {	// received new channel to add
                var i, l, c;
                var src = sourcesMap[dragSourceId];

                // Iterate through channels and call addChannel on
                // entries with no id
                // NOTE: We assume the only reason the id is blank is if the
                //       element is new (user dragged into channels)
                c = $("#_timeline_channels").children();
                l = c.length;
                for (i = 0; i < l; i++) {
                    if (c[i].id == "") {
                        addChannel(src, c[i]);
                    }
                }
            }
        });
        $("#_timeline_channels").disableSelection();

        // Click handlers
        $("#_timeline_new_view_btn").click(newView);
        //$("#_timeline_load_view_btn").click(toggleLoadDialog);

        updateLoadViewDropdown();
        updateSaveViewDropdown();

        $("#_timeline_save_view_dropdown").click(function(event){
            $("#_timeline_save_view_dropdown_name").doTimeout(100,"focus");
        });

        $("#_timeline_save_view_btn").click(function(event){
            event.preventDefault();
            if ($(event.delegateTarget).hasClass("disabled"))
                return;
            if ($("#_timeline_viewName").text() != newViewName)
                saveView($("#_timeline_viewName").text());
            else
               $("#_timeline_save_view_dropdown").doTimeout(50,"click");
        });


        $("#_timeline_new_gotoBeginning_button").click(function(event) { event.preventDefault(); gotoTime("beginning"); });
        $("#_timeline_new_gotoBack_button").click(function(event) { event.preventDefault(); gotoTime("back"); });
        $("#_timeline_new_gotoForward_button").click(function(event) { event.preventDefault(); gotoTime("forward"); });
        $("#_timeline_new_gotoEnd_button").click(function(event) { event.preventDefault(); gotoTime("end"); });
        $("#_timeline_new_zoomOut_button").click(function(event) { event.preventDefault(); zoomTime("out"); });
        $("#_timeline_new_zoomIn_button").click(function(event) { event.preventDefault(); zoomTime("in"); });

        // Configure the photo dialog
        $("#_timeline_photo_dialog")['dialog'](
            {
                autoOpen  : false,
                modal     : true,
                width     : 'auto',
                height    : 'auto',
                minWidth  : 340,
                resizable : false
            }
        );

        // Load sources
        getSources(function() {
            console.log("getSources is called");
            $("#_timeline_messageArea").hide();
            $("#_timeline_mainContentArea").show();

            if (typeof callback === "function") {
                console.log("callback is called: " + callback);
                callback();
            }

            for (var connectorName in connectorEnabled){
                connectorToggled(connectorName,null,true);
            }
        });
    }