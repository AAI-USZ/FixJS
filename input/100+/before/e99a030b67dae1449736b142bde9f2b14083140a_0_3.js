function (topic) {
    // console.log(topic);
    jQuery("#close-button").show();
    jQuery("#down-button").show();
    // 
    var infoHeader = '<div id="info-table">';
    infoHeader += '<h3 class="title">' + topic.name + '</h3></div>';
    // infoHeader += '<a href="#" onclick="javascript:kiezatlas.scrollInfoDown()">||</a>';
    var infoItem = "";
    // 
    var street = kiezatlas.getTopicAddress(topic);
    var postalCode = kiezatlas.getTopicPostalCode(topic);
    var cityName = kiezatlas.getTopicCity(topic);
    var latLng = kiezatlas.getLatLng(topic);
    // 
    if (cityName == undefined) cityName = "Berlin"; // fixing the imported dataset from ehrenamtsnetz
    if (cityName == " Berlin" || cityName == "Berlin") { // ### FIXME sloppy
      var target = street + "%20" + postalCode + "%20" + cityName;
      var publicTransportURL = "http://www.fahrinfo-berlin.de/fahrinfo/bin/query.exe/d?Z=" 
        + target + "&REQ0JourneyStopsZA1=2&start=1";
      var imageLink = '<a href="' + publicTransportURL + '" target="_blank">'
        + '<img class="fahrinfo" src=\"' + kiezatlas.imagesFolder + 'fahrinfo.gif" border="0" hspace="20"/></a>';
      infoItem = '<div id="info-item"><span class="content">' + street + ', ' + postalCode + ' ' 
        + cityName + imageLink + '</span><br/>';
    } else {
      infoItem = '<div id="info-item">'
        + '<span class="content">' + street + ', ' + postalCode + ' ' + cityName + '</span><br/>';
    }
    // stripping unwanted fields of the data container
    topic = kiezatlas.stripFieldsContaining(topic, "LAT");
    topic = kiezatlas.stripFieldsContaining(topic, "LONG");
    topic = kiezatlas.stripFieldsContaining(topic, "Locked Geometry");
    topic = kiezatlas.stripFieldsContaining(topic, "Forum / Aktivierung");
    topic = kiezatlas.stripFieldsContaining(topic, "Image");
    topic = kiezatlas.stripFieldsContaining(topic, "Icon");
    topic = kiezatlas.stripFieldsContaining(topic, "YADE");
    topic = kiezatlas.stripFieldsContaining(topic, "Name");
    topic = kiezatlas.stripFieldsContaining(topic, "Description");
    topic = kiezatlas.stripFieldsContaining(topic, "Timestamp");
    topic = kiezatlas.stripFieldsContaining(topic, "OriginId");
    topic = kiezatlas.stripFieldsContaining(topic, "Administrator Infos");
    topic = kiezatlas.stripFieldsContaining(topic, "Address");
    // topic = kiezatlas.stripFieldsContaining(topic, "Stichworte");
    topic = kiezatlas.stripFieldsContaining(topic, "Stadt");
    // remove set of categories..
    // topic = kiezatlas.stripFieldsContaining(topic, "Zielgruppen");
    // topic = kiezatlas.stripFieldsContaining(topic, "Einsatzbereiche");
    // topic = kiezatlas.stripFieldsContaining(topic, "Merkmale");
    // topic = kiezatlas.stripFieldsContaining(topic, "Bezirk");
    // topic = kiezatlas.stripFieldsContaining(topic, "Kategorie");
    // 
    var propertyList = ''; //<table width="100%" cellpadding="2" border="0"><tbody>';
    for (var i=0; i < topic.properties.length; i++) {
      // build html for attributes to display for an informational object
      if (topic.properties[i].label.indexOf("Sonstiges") != -1) {
        // skipping: propertyList += '<p class="additionalInfoWhite">';
      } else if (topic.properties[i].label.indexOf("Administrator") != -1) {
        // skipping: propertyList += '<p class="additionalInfo">';
      } else if (topic.properties[i].label == "Barrierefrei" && topic.properties[i].value == "") {
        // skip rendering Barrierefrei-Field cause value was not set yet
      } else if (topic.properties[i].value == "") {
        // skip rendering label for empty value
      } else {
        propertyList +=  '<br/>' + topic.properties[i].label + ':&nbsp;';
      }
      if (topic.properties[i].type == 0) {
        // DM Property Type Single Value
        if (topic.properties[i].label.indexOf("Barrierefrei") == -1) {
          // ordinary rendering for DM Property Type Single Value
          propertyList += '<b>' + topic.properties[i].value + '</b>';
        } else {
          // special rendering for the "BARRIERFREE_ACCESS"-Property
          if (topic.properties[i].value == "") {
            // skip rendering Barrierefrei-Field cause value was not set yet
          } else if (topic.properties[i].value == "Ja") {
            propertyList += '<b>Ja Rollstuhlgerecht</b></p>';
          } else if (topic.properties[i].value.indexOf("Eingeschr") != -1) {
            propertyList += '<b>Eingeschr&auml;nkt Rollstuhlgerecht</b></p>';
          } else if (topic.properties[i].value == "Nein") {
            propertyList += '<b>Nicht Rollstuhlgerecht</b></p>';
          } else {
            propertyList +=  '<b>' + topic.properties[i].value + '</b><p/>';
          }
        }
        // propertyList +=  '<p>' + topic.properties[i].name + ':&nbsp;<b>' + topic.properties[i].value + '</b><p/>';
      } else {
        // DM Property Type Multi Value
        var stringValue = "";
        propertyList += '';
        for ( var k=0; k < topic.properties[i].values.length; k++ ) {
          // 
          value = topic.properties[i].values[k].name;
          if (topic.properties[i].name == "Person") {
            // label = 'Ansprechpartner:&nbsp;';
            // label + 
            propertyList += '<b>' + value + '</b>&nbsp;';
          } else if (topic.properties[i].name == "Webpage") {
            // label = '';
            value = kiezatlas.makeEhrenamtsLink(value, value);
            // label + 
            propertyList += '<b>' + value + '</b>&nbsp;';
            // propertyList += '<p><i class="cats">Kategorien:</i>&nbsp;';
          } else {
            propertyList += '<b>' + value + '</b>&nbsp;';
          }
        }
        propertyList += '<br/>';
      }
    }
    infoItem += propertyList;
    infoItem += "</p></div>";
    // 
    jQuery("#scroller").html(infoHeader);
    jQuery("#scroller").append(infoItem);
    //
    kiezatlas.showInfoContainer();
    // 
    if (kiezatlas.myScroll != undefined) {
      kiezatlas.myScroll.destroy();
      kiezatlas.myScroll = null;
    }
    kiezatlas.myScroll = new iScroll('info-container', { 
      "momentum": true, "hScrollbar": false, "vScrollbar": true, 
      "hideScrollbar" : false, 
      "justScrolled": function () { jQuery("#top-button").show(); },
      "justReset": function () { jQuery("#top-button").hide(); }
    });
    // 
    // jQuery("#info-container .title").click(kiezatlas.toggleInfoItem);
    kiezatlas.map.panTo(latLng);
  }