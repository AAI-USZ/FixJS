function addChannel(channel, target) {
        var max_time;

        // VERY important to clone the given channel here!
        channel = TOOLS.clone(channel);

        id = channelIdx;
        channelIdx += 1;

        var channelElementId = "_timeline_channel_" + id;
        var plotElementId = "_timeline_plot_" + id;
        var yAxisElementId = "_timeline_yAxis_" + id;
        var templateValues = {
            "deviceName"       : channel["device_name"],
            "channelName"      : channel["channel_name"],
            "channelHeight"    : channel["channel_height"],
            "channelTabHeight" : channel["channel_height"] + CHANNEL_PADDING,
            "CHANNEL_PADDING"  : CHANNEL_PADDING,
            "plotId"           : id,
            "plotElementId"    : plotElementId,
            "channelElementId" : channelElementId,
            "yAxisElementId"   : yAxisElementId
        };

        // Render template
        var html = Hogan.compile($("#_timeline_channel_template").html()).render(templateValues);
        if (target == null || target == undefined || target == "") {
            $("#_timeline_channels").append(html);
        }
        else {
            $(target).replaceWith(html);
        }

        // Make sure the view name doesn't overflow the bounds of the box
        $("#" + channelElementId + "-timeline-channel-name")
            .html(channel["channel_name"])
            .shorten();

        var yMin = channel.min;
        var yMax = channel.max;
        if (yMin == yMax){
            yMin -= 1;
            yMax += 1;
        }

        var yAxis = new NumberAxis(yAxisElementId, "vertical", {
            "min" : yMin,
            "max" : yMax
        });

        // Now that yAxis is initialized, if this is a new view,
        // set xAxis range to be the latest 24 hrs of data from the
        // first added channel
        if ((VIEWS.data["name"] == newViewName) &&
            channel.hasOwnProperty("max_time") &&
            ($("#_timeline_channels ._timeline_channel").length == 0)) {
            max_time = channel["max_time"];
            dateAxis.setRange(max_time - 86400.0, max_time);
        }

        // TODO: The following should be keying off of "type" rather than "name" fields
        var plot = null;
        if ("photos" == channel["channel_name"]) {
            var tags = [];
            var willJoinUsingAnd = false;
            var photoStyle = channel['style'];
            if (typeof photoStyle !== 'undefined' &&
                typeof photoStyle['filters'] !== 'undefined' &&
                typeof photoStyle['filters']['tag'] !== 'undefined') {

                if (jQuery.isArray(photoStyle['filters']['tag']['tags'])) {
                    tags = photoStyle['filters']['tag']['tags'];
                }
                willJoinUsingAnd = !!photoStyle['filters']['tag']['isAndJoin'];
            }
            plot = new PhotoSeriesPlot(photoDatasource(App.getUID(), channel["device_name"], tags,	willJoinUsingAnd),
                dateAxis,
                yAxis,
                App.getUID(),
                channel["style"]);
            plot.addDataPointListener(photoDataPointListener(channelElementId));
        } else if ("comments" == channel["channel_name"]) {
            var commentStyle = channel['style'];
            if (typeof commentStyle !== 'undefined' &&
                typeof commentStyle['filters'] !== 'undefined' &&
                typeof commentStyle['filters']['tag'] !== 'undefined') {

                if (jQuery.isArray(commentStyle['filters']['tag']['tags'])) {
                    tags = commentStyle['filters']['tag']['tags'];
                }
                willJoinUsingAnd = !!commentStyle['filters']['tag']['isAndJoin'];
            }
            alert("Implement commentDatasource and CommentSeriesPlot");
//			var commentDatasource = commentDatasource(App.getUID(),
//			channel["device_name"],
//			tags,
//			willJoinUsingAnd);
//			plot = new CommentSeriesPlot(commentDatasource,
//			dateAxis,
//			yAxis,
//			App.getUID(),
//			channel["style"]);
//			plot.addDataPointListener(commentDataPointListener(channelElementId));
        } else {
            // Set up the plot and axes for this channel using the grapher API
            plot = new DataSeriesPlot(channelDatasource(App.getUID(), channel["device_name"], channel["channel_name"]),
                dateAxis,
                yAxis,
                channel["style"]);
            plot.addDataPointListener(dataPointListener);
        }

        var plotContainer = new PlotContainer(plotElementId, false, [plot]);

        channelsMap[channelElementId] = channel;
        plotsMap[channelElementId] = plot;
        plotContainersMap[channelElementId] = plotContainer;
        plotContainers.push(plotContainer);

        // Gear button
        $("#" + channelElementId + "_btnGear").unbind("click").click(function(event) {
            event.preventDefault();
            var channelConfigElement = $(this).parents("._timeline_channel")
                .children("._timeline_channelConfig");

            channelConfigElement.toggle();

            if (channelConfigElement.css("display") === "none") {
                $(this).find("img").attr("src", "/static/images/gear_b.png");
            }
            else {
                $(this).find("img").attr("src", "/static/images/gear_green.png");
            }
        });

        // Delete buton
        $("#" + channelElementId + "_delete_btn")
            .addClass("_timeline_channel_" + channel.device_name + "_" + channel.channel_name + "_delete_btn")
            .unbind('click')
            .click(function(event) {
                event.preventDefault();
                var channelElement = $(this).parents("._timeline_channel").parent();
                plotContainer.removePlot(plot);
                $(channelElement).remove();
            });

        // Drag to resize
        $("#" + channelElementId + "_dragArea").unbind("mousedown").mousedown(function() {
        	var channelElement = $(this).parents("._timeline_channel").parent();
        	// Extract plotId from channelElement id attribute
            dragAreaOnMouseDown(channelElement.attr("id").slice(18));
        });

        // Style configuration
        if (plot instanceof DataSeriesPlot) {

            // Define a function which handles updating a channel's style
            // whenever anything in the channel configuration changes
            var updateDataSeriesPlotChannelConfig = function() {
                var channelElement = $(this).parents("._timeline_channel").parent();
                var plot = plotsMap[channelElement.attr("id")];

                var newStyle = plot.getStyle();

                newStyle['styles'] = [];                // completely overwrite the existing styles array
                newStyle['highlight'] = {};             // completely overwrite the existing highlight object
                newStyle['highlight']['styles'] = [];   // initialize the highlight styles array

                var isZeo = $("#" + channelElementId + "-config-zeo-show").is(':checked');
                var highlightLineWidth = 0;

                if (isZeo) {
                    newStyle['styles'][newStyle['styles'].length] = {
                        "type" : "zeo",
                        "show" : true
                    };
                    highlightLineWidth = 1;
                } else {
                    var linesStyle = {
                        "type"      : "line",
                        "show"      : $("#" + channelElementId + "-config-lines-show").is(':checked'),
                        "color"     : $("#" + channelElementId + "-config-lines-color").next(".color_picker").css("background-color"),
                        "lineWidth" : TOOLS.parseInt($("#" + channelElementId + "-config-lines-lineWidth").val(), 1)
                    };

                    var pointsStyleType = $("#" + channelElementId + "-config-points-type").val();
                    var pointsStyleFill = pointsStyleType.match(/-filled$/) !== null;
                    var pointsStyle = {
                        "type"      : pointsStyleType.replace('-filled', ''),
                        "show"      : $("#" + channelElementId + "-config-points-show").is(':checked'),
                        "lineWidth" : 1,
                        "radius"    : TOOLS.parseInt($("#" + channelElementId + "-config-points-radius").val(), 2),
                        "color"     : $("#" + channelElementId + "-config-points-color").next(".color_picker").css("background-color"),
                        "fill"      : pointsStyleFill,
                        "fillColor" : $("#" + channelElementId + "-config-points-fillColor").next(".color_picker").css("background-color")
                    };

                    var barsStyle = {
                        "type"      : "lollipop",
                        "show"      : $("#" + channelElementId + "-config-bars-show").is(':checked'),
                        "lineWidth" : TOOLS.parseInt($("#" + channelElementId + "-config-bars-lineWidth").val(), 1),
                        "radius"    : 0,
                        "color"     : $("#" + channelElementId + "-config-bars-color").next(".color_picker").css("background-color"),
                        "fill"      : false
                    };

                    // Add the styles to the array--note that ordering here isn't arbitrary.  Styles are rendered in the order
                    // they appear in the array.  Thus, we put points AFTER lines and bars so that the point gets rendered on top.
                    // Value is placed last so that it's on top of everything.
                    newStyle['styles'][newStyle['styles'].length] = linesStyle;
                    newStyle['styles'][newStyle['styles'].length] = barsStyle;
                    newStyle['styles'][newStyle['styles'].length] = pointsStyle;

                    // Compute the lineWidth value for highlights by taking the max line width from the lines and bars
                    // styles (but only if they're visible) and incrementing by 1.
                    if (linesStyle['show']) {
                        highlightLineWidth = Math.max(highlightLineWidth, linesStyle['lineWidth']);
                    }
                    if (barsStyle['show']) {
                        highlightLineWidth = Math.max(highlightLineWidth, barsStyle['lineWidth']);
                    }
                    highlightLineWidth += 1;
                }

                // build the values style (we decide next where to stick it)
                var valuesStyle = {
                    "type"           : "value",
                    "show"           : $("#" + channelElementId + "-config-values-show").is(':checked'),
                    "fillColor"      : $("#" + channelElementId + "-config-values-fillColor").next(".color_picker").css("background-color"),
                    "marginWidth"    : TOOLS.parseInt($("#" + channelElementId + "-config-values-marginWidth").val(), 5),
                    "verticalOffset" : TOOLS.parseInt($("#" + channelElementId + "-config-values-verticalOffset").val(), 7),
                    "numberFormat"   : $("#" + channelElementId + "-config-values-numberFormat").val()
                };

                // We'll always put the values style in both the styles array AND the highlight styles array.  The "show"
                // field will be false for both if Values option is unchecked.  The "show" field will be true for both if the
                // Values option is checked and the showOnlyOnHighlight option is false.  If the showOnlyOnHighlight option is
                // true, then the instance in the styles array will have show set to false
                newStyle['highlight']['styles'][newStyle['highlight']['styles'].length] = valuesStyle;
                var onlyShowValuesOnHighlight = $("#" + channelElementId + "-config-values-showOnlyOnHighlight").val() === 'true';
                if (onlyShowValuesOnHighlight) {
                    // clone the valuesStyle instance
                    var valuesStyleCopy = TOOLS.clone(valuesStyle);
                    valuesStyleCopy["show"] = false;
                    newStyle['styles'][newStyle['styles'].length] = valuesStyleCopy;
                } else {
                    newStyle['styles'][newStyle['styles'].length] = valuesStyle;
                }

                // set the highlight line width
                newStyle['highlight']['lineWidth'] = highlightLineWidth;

                // Finally, build the comments style (this completely overwrites the existing comments object)
                var commentsStyleType = $("#" + channelElementId + "-config-comments-type").val();
                var commentsStyleFill = commentsStyleType.match(/-filled$/) !== null;
                newStyle['comments'] = {
                    "show"           : $("#" + channelElementId + "-config-comments-show").is(':checked'),
                    "styles"         : [{
                        "type"      : commentsStyleType.replace('-filled', ''),
                        "show"      : $("#" + channelElementId + "-config-comments-show").is(':checked'),
                        "lineWidth" : 1,
                        "radius"    : TOOLS.parseInt($("#" + channelElementId + "-config-comments-radius").val(), 3),
                        "color"     : $("#" + channelElementId + "-config-comments-color").next(".color_picker").css("background-color"),
                        "fill"      : commentsStyleFill,
                        "fillColor" : $("#" + channelElementId + "-config-comments-fillColor").next(".color_picker").css("background-color")
                    }],
                    "verticalMargin" : 4
                };

                plot.setStyle(newStyle);
            };

            // Show DataSeriesPlot config
            $("#" + channelElementId + " ._timeline_data_series_plot_config").show();

            // First, record whether this is a Zeo plot
            var isZeo = channel["channel_name"] == "Sleep_Graph";

            // Check for styles array
            if (!channel["style"].hasOwnProperty("styles")) {
                channel["style"]["styles"] = [];
            }
            // Check for highlight object
            if (!channel["style"].hasOwnProperty("highlight")) {
                channel["style"]["highlight"] = {};
            }
            // Check for highlight styles array
            if (!channel["style"]["highlight"].hasOwnProperty("styles")) {
                channel["style"]["highlight"]["styles"] = [];
            }
            // Check for comments object
            if (!channel["style"].hasOwnProperty("comments")) {
                channel["style"]["comments"] = {};
            }
            // Check for comments styles array
            if (!channel["style"]["comments"].hasOwnProperty("styles")) {
                channel["style"]["comments"]["styles"] = [];
            }

            // get the next default color
            var defaultColor = "#" + jQuery.fn.colorPicker.getNextColor();

            // Load up the existing styles (if any) from the styles array
            var linesStyle = {"type" : "line", "show" : false, "lineWidth" : 1, "color" : defaultColor};
            var pointsStyle = {"type" : "point", "show" : false, "radius" : 2, "fill" : true, "color" : defaultColor, "fillColor" : defaultColor};
            var barsStyle = {"type" : "lollipop", "show" : false, "color" : defaultColor};
            var valuesStyle1 = {"type" : "value", "show" : false, "fillColor" : defaultColor};
            var valuesStyle2 = {"type" : "value", "show" : false, "fillColor" : defaultColor};
            var commentsStyle = {"type" : "point", "show" : true, "radius" : 3, "fill" : true, "color" : defaultColor, "fillColor" : defaultColor};

            for (var styleTypeIndex = 0; styleTypeIndex < channel["style"]["styles"].length; styleTypeIndex++) {
                var theStyle = channel["style"]["styles"][styleTypeIndex];
                if (typeof theStyle["type"] !== 'undefined') {
                    if (theStyle["type"] == "line") {
                        linesStyle = theStyle;
                    } else if (theStyle["type"] == "point" ||
                        theStyle["type"] == "square" ||
                        theStyle["type"] == "cross" ||
                        theStyle["type"] == "plus") {
                        // fill defaults to true if unspecified
                        if (typeof theStyle["fill"] === 'undefined') {
                            theStyle["fill"] = true;
                        }
                        pointsStyle = theStyle;
                    } else if (theStyle["type"] == "lollipop") {
                        // fill defaults to true if unspecified
                        if (typeof theStyle["fill"] === 'undefined') {
                            theStyle["fill"] = true;
                        }
                        barsStyle = theStyle;
                    } else if (theStyle["type"] == "value") {
                        valuesStyle1 = theStyle;
                    }

                    // show defaults to true if unspecified
                    if (typeof theStyle["show"] === 'undefined') {
                        theStyle["show"] = true;
                    }
                }
            }

            // build the type-ui field
            pointsStyle['type-ui'] = pointsStyle['type'];
            if (pointsStyle['fill'] && (pointsStyle['type'] == 'point' || pointsStyle['type'] == 'square')) {
                pointsStyle['type-ui'] += '-filled';
            }

            // Load up the existing styles (if any) from the highlight styles array--we currently only support the values style
            for (var highlightStyleTypeIndex = 0; highlightStyleTypeIndex < channel["style"]["highlight"]["styles"].length; highlightStyleTypeIndex++) {
                var theHighlightStyle = channel["style"]["highlight"]["styles"][highlightStyleTypeIndex];
                if (theHighlightStyle["type"] == "value") {
                    valuesStyle2 = theHighlightStyle;
                }

                // show defaults to true if unspecified
                if (typeof theHighlightStyle["show"] === 'undefined') {
                    theHighlightStyle["show"] = true;
                }
            }

            // now merge valuesStyle1 and valuesStyle2 (they should be identical, except for the "show" field)
            var valuesStyle = jQuery.extend(true, {}, valuesStyle1, valuesStyle2);
            valuesStyle["show"] = valuesStyle1["show"] || valuesStyle2["show"];

            // map the verticalOffset in valuesStyle to one of the three options we support.
            valuesStyle["verticalOffset"] = TOOLS.parseInt(valuesStyle["verticalOffset"], 7);
            if (valuesStyle["verticalOffset"] > -3) {
                valuesStyle["verticalOffset"] = 7;
            } else if (valuesStyle["verticalOffset"] < -3) {
                valuesStyle["verticalOffset"] = -13;
            }

            // determine whether values should always be shown, or only on highlight (mouseover).  Note that the
            // concatenation here ensures that it's a string, which is required for when we set the selected index
            // of the select menu below.
            var showValuesOnlyOnHighlight = "" + (!valuesStyle1["show"] && valuesStyle2["show"]);

            // Load up the existing styles (if any) from the comments styles array--we currently only support a single point style
            for (var commentsStyleTypeIndex = 0; commentsStyleTypeIndex < channel["style"]["comments"]["styles"].length; commentsStyleTypeIndex++) {
                var theCommentsStyle = channel["style"]["comments"]["styles"][commentsStyleTypeIndex];
                if (theCommentsStyle["type"] == "point" ||
                    theCommentsStyle["type"] == "square" ||
                    theCommentsStyle["type"] == "cross" ||
                    theCommentsStyle["type"] == "plus") {
                    commentsStyle = theCommentsStyle;
                }

                // show defaults to true if unspecified
                if (typeof commentsStyle["show"] === 'undefined') {
                    commentsStyle["show"] = true;
                }
            }

            // build the type-ui field
            commentsStyle['type-ui'] = commentsStyle['type'];
            if (commentsStyle['fill'] && (commentsStyle['type'] == 'point' || commentsStyle['type'] == 'square')) {
                commentsStyle['type-ui'] += '-filled';
            }

            /* add event handler for the Save As Default Style link --------------------------------------------------- */
            $("#" + channelElementId + "-save-default-style > a").click(function() {
                $("#" + channelElementId + "-save-default-style").hide();
                $("#" + channelElementId + "-save-default-style-status").html("Saving...").show();
                saveDefaultChannelStyle(channel, plot.getStyle(), {
                    success : function() {
                        getSources();
                        $("#" + channelElementId + "-save-default-style-status").html("Default style saved.").delay(1000).fadeOut(1000,
                            function() {
                                $("#" + channelElementId + "-save-default-style").show();
                            }
                        );
                    },
                    error:function(textStatus, errorThrown){
                        console.log("saveDefaultChannelStyle(): Failed due to ["+textStatus+"].  Error thrown: " + errorThrown);
                        $("#" + channelElementId + "-save-default-style-status").html("Failed to save default style.").delay(1000).fadeOut(1000,
                            function() {
                                $("#" + channelElementId + "-save-default-style").show();
                            });
                    }
                });
            });

            /* add event handler for the Show all Y range link */
            $("#" + channelElementId + " #" + channelElementId + "_btnShowAllY").click(function(event) {
                event.preventDefault();
                var plot = plotsMap[channelElementId];
                if (!(plot && !!plot.getStatistics)) {
                    // Photo plots don't have a getStatistics method
                    return false;
                }

                var xAxis = plot.getHorizontalAxis();
                var yAxis = plot.getVerticalAxis();
                var xMin = xAxis.getMin();
                var xMax = xAxis.getMax();

                var afterload = function(stats) {
                    if (stats["has_data"]) {
                        var yMin = stats["y_min"];
                        var yMax = stats["y_max"];
                        var yDiff = yMax - yMin;
                        if(yDiff < 1e-10) {
                            yAxis.setRange(yMin - 0.5, yMin + 0.5);
                        } else {
                            var padding = 0.1 * yDiff;
                            yAxis.setRange(yMin - padding, yMax + padding);
                        }
                        plot.setStyle(plot.getStyle()); // Trigger a repaint
                    }
                };

                var initialStats = plot.getStatistics(xMin, xMax,
                    ["has_data", "y_min", "y_max"],
                    afterload);
                if (!("data_pending" in initialStats)
                    || (!initialStats["data_pending"])) {
                    afterload(initialStats);
                }
                // Else the getStatistics method will call afterload when
                // the data arrives

                return false;
            });

            /* Configure the Zeo options ------------------------------------------------------------------------------ */
            $("#" + channelElementId + "-config-zeo-show").prop("checked", isZeo);

            /* Configure the Color Override options ------------------------------------------------------------------- */
            $("#" + channelElementId + "-config-color-override-color").colorPicker();
            $("#" + channelElementId + "-config-color-override-color").val("#000000"); // we always want this one to start out black
            $("#" + channelElementId + "-config-color-override-color").change();
            $("#" + channelElementId + "-config-color-override-color").change(function() {
                var overrideColor = $("#" + channelElementId + "-config-color-override-color").next(".color_picker").css("background-color");
                $("#" + channelElementId + "-config-lines-color").val(overrideColor).change();
                $("#" + channelElementId + "-config-points-color").val(overrideColor).change();
                $("#" + channelElementId + "-config-points-fillColor").val(overrideColor).change();
                $("#" + channelElementId + "-config-bars-color").val(overrideColor).change();
                $("#" + channelElementId + "-config-values-fillColor").val(overrideColor).change();
                $("#" + channelElementId + "-config-comments-color").val(overrideColor).change();
                $("#" + channelElementId + "-config-comments-fillColor").val(overrideColor).change();
            });

            /* Configure the Lines options ---------------------------------------------------------------------------- */

            // don't show this section if this is a Zeo plot
            $("#" + channelElementId + "-config-lines").toggle(!isZeo);

            // Set the initial value of the show checkbox
            $("#" + channelElementId + "-config-lines-show").prop("checked", linesStyle["show"] && !isZeo);
            $("#" + channelElementId + "-config-lines-show").change(updateDataSeriesPlotChannelConfig);

            // Set the initial value of the lineWidth select menu
            $("#" + channelElementId + "-config-lines-lineWidth").val(TOOLS.parseInt(linesStyle["lineWidth"], 1));
            $("#" + channelElementId + "-config-lines-lineWidth").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-lines-lineWidth").msDropDown();

            // Create the color colorpicker, and set its initial value
            $("#" + channelElementId + "-config-lines-color").colorPicker();
            $("#" + channelElementId + "-config-lines-color").val(typeof linesStyle["color"] === 'undefined' ? defaultColor : linesStyle["color"]);
            $("#" + channelElementId + "-config-lines-color").change();
            $("#" + channelElementId + "-config-lines-color").change(updateDataSeriesPlotChannelConfig);

            /* Configure the Points options --------------------------------------------------------------------------- */

            // don't show this section if this is a Zeo plot
            $("#" + channelElementId + "-config-points").toggle(!isZeo);

            // Set the initial value of the show checkbox
            $("#" + channelElementId + "-config-points-show").prop("checked", pointsStyle["show"] && !isZeo);
            $("#" + channelElementId + "-config-points-show").change(updateDataSeriesPlotChannelConfig);

            // Set the initial value of the type select menu and the initial state of the fillColor color picker
            $("#" + channelElementId + "-config-points-type").val(pointsStyle['type-ui']);
            $("#" + channelElementId + "-config-points-type").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-points-type").change(function() {
                var isFilledType = $("#" + channelElementId + "-config-points-type").val().match(/-filled$/) !== null;
                $("#" + channelElementId + "-config-points-fillColor-container").toggle(isFilledType);
            });
            $("#" + channelElementId + "-config-points-type").msDropDown();
            $("#" + channelElementId + "-config-points-fillColor-container").toggle(pointsStyle['fill']);

            // Set the initial value of the radius select menu
            $("#" + channelElementId + "-config-points-radius").val(TOOLS.parseInt(pointsStyle["radius"], 2));
            $("#" + channelElementId + "-config-points-radius").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-points-radius").msDropDown();

            // Create the color colorpicker, and set its initial value
            $("#" + channelElementId + "-config-points-color").colorPicker();
            $("#" + channelElementId + "-config-points-color").val(typeof pointsStyle["color"] === 'undefined' ? defaultColor : pointsStyle["color"]);
            $("#" + channelElementId + "-config-points-color").change();
            $("#" + channelElementId + "-config-points-color").change(updateDataSeriesPlotChannelConfig);

            // Create the fillColor colorpicker, and set its initial value
            $("#" + channelElementId + "-config-points-fillColor").colorPicker();
            $("#" + channelElementId + "-config-points-fillColor").val(typeof pointsStyle["fillColor"] === 'undefined' ? defaultColor : pointsStyle["fillColor"]);
            $("#" + channelElementId + "-config-points-fillColor").change();
            $("#" + channelElementId + "-config-points-fillColor").change(updateDataSeriesPlotChannelConfig);

            /* Configure the Bars options ----------------------------------------------------------------------------- */

            // don't show this section if this is a Zeo plot
            $("#" + channelElementId + "-config-bars").toggle(!isZeo);

            // Set the initial value of the show checkbox
            $("#" + channelElementId + "-config-bars-show").prop("checked", barsStyle["show"] && !isZeo);
            $("#" + channelElementId + "-config-bars-show").change(updateDataSeriesPlotChannelConfig);

            // Set the initial value of the lineWidth select menu
            $("#" + channelElementId + "-config-bars-lineWidth").val(TOOLS.parseInt(barsStyle["lineWidth"], 1));
            $("#" + channelElementId + "-config-bars-lineWidth").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-bars-lineWidth").msDropDown();

            // Create the color colorpicker, and set its initial value
            $("#" + channelElementId + "-config-bars-color").colorPicker();
            $("#" + channelElementId + "-config-bars-color").val(typeof barsStyle["color"] === 'undefined' ? defaultColor : barsStyle["color"]);
            $("#" + channelElementId + "-config-bars-color").change();
            $("#" + channelElementId + "-config-bars-color").change(updateDataSeriesPlotChannelConfig);

            /* Configure the Values options --------------------------------------------------------------------------- */

            // Set the initial value of the show checkbox
            $("#" + channelElementId + "-config-values-show").prop("checked", valuesStyle["show"]);
            $("#" + channelElementId + "-config-values-show").change(updateDataSeriesPlotChannelConfig);

            // Create the fillColor colorpicker, and set its initial value
            $("#" + channelElementId + "-config-values-fillColor").colorPicker();
            $("#" + channelElementId + "-config-values-fillColor").val(typeof valuesStyle["fillColor"] === 'undefined' ? defaultColor : valuesStyle["fillColor"]);
            $("#" + channelElementId + "-config-values-fillColor").change();
            $("#" + channelElementId + "-config-values-fillColor").change(updateDataSeriesPlotChannelConfig);

            // Set the initial value of the numberFormat select menu
            $("#" + channelElementId + "-config-values-numberFormat").val(typeof valuesStyle["numberFormat"] === 'undefined' ? "###,##0.0##" : valuesStyle["numberFormat"]);
            $("#" + channelElementId + "-config-values-numberFormat").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-values-numberFormat").msDropDown();

            // Set the initial value of the verticalOffset select menu
            $("#" + channelElementId + "-config-values-verticalOffset").val(TOOLS.parseInt(valuesStyle["verticalOffset"], 7));
            $("#" + channelElementId + "-config-values-verticalOffset").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-values-verticalOffset").msDropDown();

            // Set the initial value of the showOnlyOnHighlight select menu and the initial visibility of the marginWidth select menu
            $("#" + channelElementId + "-config-values-showOnlyOnHighlight").val(showValuesOnlyOnHighlight);
            $("#" + channelElementId + "-config-values-showOnlyOnHighlight").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-values-showOnlyOnHighlight").change(function() {
                var shouldShowMarginMenu = $("#" + channelElementId + "-config-values-showOnlyOnHighlight").val() == 'false';
                $("#" + channelElementId + "-config-values-marginWidth-label-container").toggle(shouldShowMarginMenu);
                $("#" + channelElementId + "-config-values-marginWidth-container").toggle(shouldShowMarginMenu);
            });
            $("#" + channelElementId + "-config-values-showOnlyOnHighlight").msDropDown();
            var showValuesOnlyOnHighlightBoolean = showValuesOnlyOnHighlight == 'true';
            $("#" + channelElementId + "-config-values-marginWidth-label-container").toggle(!showValuesOnlyOnHighlightBoolean);
            $("#" + channelElementId + "-config-values-marginWidth-container").toggle(!showValuesOnlyOnHighlightBoolean);

            // Set the initial value of the marginWidth select menu
            $("#" + channelElementId + "-config-values-marginWidth").val(TOOLS.parseInt(valuesStyle["marginWidth"], 5));
            $("#" + channelElementId + "-config-values-marginWidth").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-values-marginWidth").msDropDown();

            /* Configure the Comments options ------------------------------------------------------------------------- */

            // Set the initial value of the show checkbox
            $("#" + channelElementId + "-config-comments-show").prop("checked", commentsStyle["show"]);
            $("#" + channelElementId + "-config-comments-show").change(updateDataSeriesPlotChannelConfig);

            // Set the initial value of the type select menu and the initial state of the fillColor color picker
            $("#" + channelElementId + "-config-comments-type").val(commentsStyle['type-ui']);
            $("#" + channelElementId + "-config-comments-type").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-comments-type").change(function() {
                var isFilledType = $("#" + channelElementId + "-config-comments-type").val().match(/-filled$/) !== null;
                $("#" + channelElementId + "-config-comments-fillColor-container").toggle(isFilledType);
            });
            $("#" + channelElementId + "-config-comments-type").msDropDown();
            $("#" + channelElementId + "-config-comments-fillColor-container").toggle(commentsStyle['fill']);

            // Set the initial value of the radius select menu
            $("#" + channelElementId + "-config-comments-radius").val(TOOLS.parseInt(commentsStyle["radius"], 3));
            $("#" + channelElementId + "-config-comments-radius").change(updateDataSeriesPlotChannelConfig);
            $("#" + channelElementId + "-config-comments-radius").msDropDown();

            // Create the color colorpicker, and set its initial value
            $("#" + channelElementId + "-config-comments-color").colorPicker();
            $("#" + channelElementId + "-config-comments-color").val(typeof commentsStyle["color"] === 'undefined' ? defaultColor : commentsStyle["color"]);
            $("#" + channelElementId + "-config-comments-color").change();
            $("#" + channelElementId + "-config-comments-color").change(updateDataSeriesPlotChannelConfig);

            // Create the fillColor colorpicker, and set its initial value
            $("#" + channelElementId + "-config-comments-fillColor").colorPicker();
            $("#" + channelElementId + "-config-comments-fillColor").val(typeof commentsStyle["fillColor"] === 'undefined' ? defaultColor : commentsStyle["fillColor"]);
            $("#" + channelElementId + "-config-comments-fillColor").change();
            $("#" + channelElementId + "-config-comments-fillColor").change(updateDataSeriesPlotChannelConfig);

            // Finally, trigger a call updateDataSeriesPlotChannelConfig() so that the grapher properly represents the config settings
            $("#" + channelElementId + "-config-comments-fillColor").change();
        } else if (plot instanceof PhotoSeriesPlot) {

            $("#" + channelElementId + " #" + channelElementId + "_btnShowAllY").click(function(event){
                event.preventDefault();
            });

            // returns the array of tags already selected for this photo
            var getUserSelectedTags = function() {
                var tags = [];
                $.each($("#" + channelElementId + "-photo-tags-filter .tagedit-listelement-old input"),
                    function(index, inputElement) {
                        var val = inputElement['value'];
                        if (typeof val === 'string' && val != '') {
                            tags[tags.length] = val;
                        }
                    }
                );
                return tags;
            };

            var updatePhotoSeriesPlotChannelConfig = function() {
                var channelElement = $(this).parents("._timeline_channel").parent();
                var plot = plotsMap[channelElement.attr("id")];
                var newStyle = plot.getStyle();
                //console.log("----------------------------------------\nOLD JSON: " + JSON.stringify(newStyle,null,3));

                // completely overwrite the existing tag filters object
                if (typeof newStyle['filters'] === 'undefined') {
                    newStyle['filters'] = {};
                }

                var isAndJoin = $("#" + channelElementId + "-photo-tags-isAndJoin").val() === 'true';
                var userSelectedTags = getUserSelectedTags();
                newStyle['filters']["tag"] = {
                    "tags" : userSelectedTags,
                    "isAndJoin" : isAndJoin
                };

                // Display the filter settings in the channel tab
                if (userSelectedTags.length > 0) {
                    var filterHtml = Hogan.compile($("#_timeline_channel_tab_filter_template").html()).render({"value":userSelectedTags.join(", ")});
                    $("#" + channelElementId + "-timeline-channel-filter").html(filterHtml).shorten();
                } else {
                    $("#" + channelElementId + "-timeline-channel-filter").text('').hide();
                }

                //console.log("NEW JSON: " + JSON.stringify(newStyle,null,3));

                plot.setStyle(newStyle);

                plot.setDatasource(photoDatasource(App.getUID(),
                    channel["device_name"],
                    newStyle['filters']["tag"]["tags"],
                    newStyle['filters']["tag"]["isAndJoin"]
                ));
            };

            // Check for filters object
            if (!channel["style"].hasOwnProperty("filters")) {
                channel["style"]["filters"] = {};
            }
            // Check for filters.tag object
            if (!channel["style"]["filters"].hasOwnProperty("tag")) {
                channel["style"]["filters"]["tag"] = {};
            }
            // Check for filters.tag.tags array
            if (!channel["style"]["filters"]["tag"].hasOwnProperty("tags")) {
                channel["style"]["filters"]["tag"]["tags"] = [];
            }
            // Check for filters.tag.isAndJoin property
            if (!channel["style"]["filters"]["tag"].hasOwnProperty("isAndJoin")) {
                channel["style"]["filters"]["tag"]["isAndJoin"] = false;  // default to joining with OR
            }

            // Load up the existing tag filter (if any)
            var tagFilter = channel["style"]["filters"]["tag"];

            // Set the initial value of the isAndJoin select menu
            $("#" + channelElementId + "-photo-tags-isAndJoin").val("" + tagFilter["isAndJoin"]);
            $("#" + channelElementId + "-photo-tags-isAndJoin").change(updatePhotoSeriesPlotChannelConfig);

            // seed the tag filter editor with the tags currently saved in the channel (if any)
            if (tagFilter['tags'].length > 0) {
                $.each(tagFilter['tags'], function(index, value) {
                    var tagHtml = Hogan.compile($("#_timeline_photo_dialog_tags_editor_tag_template").html()).render({"value" : value});
                    $("#" + channelElementId + "-photo-tags-filter").append(tagHtml);
                });
            } else {
                var tagHtml = Hogan.compile($("#_timeline_photo_dialog_tags_editor_tag_template").html()).render({"value" : ""});
                $("#" + channelElementId + "-photo-tags-filter").append(tagHtml);
            }

            // construct the tag filter editor
            var tagFilterOptions = {
                autocompleteOptions : {
                    "minLength" : 0, // TODO: make this 1 or 2 if the list of tags is huge
                    "delay"     : 0,
                    "autoFocus" : false,
                    source      : function(request, response) {
                        var tagsToExclude = getUserSelectedTags();
                        var cachedTagsData = TAG_MANAGER.getCachedTagsForTagEditor(tagsToExclude);
                        return response($.ui.autocomplete.filter(cachedTagsData, request.term));
                    }
                },
                // return, comma, space, period, semicolon
                breakKeyCodes       : [ 13, 44, 32, 59 ],
                additionalListClass : '_timeline_photo_tags_filter',
                animSpeed           : 100,
                allowAdd            : false,
                allowEdit           : false,
                allowDelete         : false,
                texts               : {
                    removeLinkTitle    : 'Remove this tag from the list',
                    saveEditLinkTitle  : 'Save changes',
                    breakEditLinkTitle : 'Undo changes'
                }
            };
            $("#" + channelElementId + "-photo-tags-filter input.tag").tagedit(tagFilterOptions);
            $("#" + channelElementId + "-photo-tags-filter").bind('tagsChanged', updatePhotoSeriesPlotChannelConfig);
            //$("#" + channelElementId + "-photo-tags-filter").bind('tagAdded', function(){console.log('tagAdded')});
            //$("#" + channelElementId + "-photo-tags-filter").bind('tagEdited', function(){console.log('tagEdited')});
            //$("#" + channelElementId + "-photo-tags-filter").bind('tagRemoved', function(){console.log('tagRemoved')});

            // Show PhotoSeriesPlot config
            $("#" + channelElementId + " ._timeline_photo_series_plot_config").show();

            // Finally, trigger a call updatePhotoSeriesPlotChannelConfig() so that the grapher properly represents the config settings
            $("#" + channelElementId + "-photo-tags-isAndJoin").change();
        }

        // Update scroll area
        TOOLS.resizeHandler();

        return html;
    }