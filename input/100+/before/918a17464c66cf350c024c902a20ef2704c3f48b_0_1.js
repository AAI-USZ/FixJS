function _rebuildMarkerLayer(geoJSON, questionName)
{
    var latLngArray = [];
    var questionColorMap = {};
    var randomColorStep = 0;
    var paletteCounter = 0;
    var responseCountValid = false;

    if(questionName)
    {
        var question = formJSONMngr.getQuestionByName(questionName);
        /// check if response count has been calculated for this question
        if(question.hasOwnProperty('responseCounts'))
            responseCountValid = true;
        else
            question.responseCounts = {};

        // formJSONMngr.getChoices returns an object NOT an array so we use children directly here
        var choices = question.children;
        // build an array of choice names so that we can append "Not Specified" to it
        var choiceNames = [];
        for(i=0;i < choices.length;i++)
        {
            var choice = choices[i];
            choiceNames.push(choice.name);
            if(!responseCountValid)
                question.responseCounts[choice.name] = 0;
        }
        choiceNames.push(notSpecifiedCaption);
        if(!responseCountValid)
            question.responseCounts[notSpecifiedCaption] = 0;
        for(i=0;i < choiceNames.length;i++)
        {
            var choiceName = choiceNames[i];
            var choiceColor = null;
            // check if color palette has colors we haven't used
            if(paletteCounter < colorPalette.length)
                choiceColor = colorPalette[paletteCounter++];
            else
            {
                // number of steps is reduced by the number of colors in our palette
                choiceColor = get_random_color(randomColorStep++, (choiceNames.length - colorPalette.length));
            }
            /// save color for this choice
            questionColorMap[choiceName] = choiceColor;
        }
    }

    /// remove existing geoJsonLayer
    markerLayerGroup.clearLayers();

    var geoJsonLayer = new L.GeoJSON(null, {
        pointToLayer: function (latlng){
            var marker = new L.CircleMarker(latlng, circleStyle);
            return marker;
        }
    });

    geoJsonLayer.on("featureparse", function(geoJSONEvt){
        var marker = geoJSONEvt.layer;
        var latLng = marker._latlng;
        latLngArray.push(latLng);

        /// check if questionName is set
        if(questionName)
        {
            var question = formJSONMngr.getQuestionByName(questionName);
            var response = geoJSONEvt.properties[questionName];
            // check if response is missing (user did not specify)
            if(!response)
                response = notSpecifiedCaption;
            /// increment response count if its not been done before
            if(!responseCountValid)
                question.responseCounts[response] += 1;
            var responseColor = questionColorMap[response];
            var newStyle = {
                color: '#fff',
                border: circleStyle.border,
                fillColor: responseColor,
                fillOpacity: circleStyle.fillOpacity,
                radius: circleStyle.opacity
            };
            marker.setStyle(newStyle);
        }
        marker.on('click', function(e){
            var latLng = e.latlng;
            var popup = new L.Popup({offset: popupOffset});
            popup.setLatLng(latLng);

            // open a loading popup so the user knows something is happening
            popup.setContent("Loading...");
            map.openPopup(popup);

            $.getJSON(mongoAPIUrl, {'query': '{"_id":' + geoJSONEvt.id + '}'}).done(function(data){
                var content;
                if(data.length > 0)
                    content = JSONSurveyToHTML(data[0]);
                else
                    content = "An unexpected error occurred";
                popup.setContent(content);
                //map.openPopup(popup);
            });
        });
    });

    /// need this here instead of the constructor so that we can catch the featureparse event
    geoJsonLayer.addGeoJSON(geoJSON);
    markerLayerGroup.addLayer(geoJsonLayer);
    refreshHexOverLay(); // TODO: add a toggle to do this only if hexOn = true;

    if(questionName)
        rebuildLegend(questionName, questionColorMap);
    else
        clearLegend();

    // fitting to bounds with one point will zoom too far
    // don't zoom when we "view by response"
    if (latLngArray.length > 1 && allowResetZoomLevel) {
        var latlngbounds = new L.LatLngBounds(latLngArray);
        map.fitBounds(latlngbounds);
    }
}