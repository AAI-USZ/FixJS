function() {
        var object = new Object();

        /* assign info to object */
        object.bereich = $(this).find('gmgml\\:BEREICH, BEREICH').text();
        object.bezeichnung = $(this).find('gmgml\\:BEZEICHNUNG, BEZEICHNUNG').text();
        object.beschreibung = $(this).find('gmgml\\:BESCHREIBUNG, BESCHREIBUNG').text();
        object.kontakt = $(this).find('gmgml\\:KONTAKT, KONTAKT').text();
        object.adresse = $(this).find('gmgml\\:ADRESSE, ADRESSE').text();
        object.ort = $(this).find('gmgml\\:ORT, ORT').text();
        object.telefon = $(this).find('gmgml\\:TELEFON, TELEFON').text();
        object.fax = $(this).find('gmgml\\:FAX, FAX').text();
        object.email = $(this).find('gmgml\\:EMAIL, EMAIL').text();
        object.webspace = $(this).find('gmgml\\:WEBSPACE, WEBSPACE').text();
        object.oeffnungszeiten = $(this).find('gmgml\\:OEFFN_ZEIT, OEFFN_ZEIT').text();

        /* determine latitude and longitude */
        object.position = $(this).find('gml\\:pos, pos').text();
        object.delimiter = object.position.indexOf(' ');

        object.lat = object.position.substr(0, object.delimiter);
        object.lng = object.position.substr(object.delimiter + 1, object.position.length);

        object.point = new google.maps.LatLng(object.lat, object.lng);

        /* assign the object to a category */
        if(object.bereich.indexOf('Amtsgebäude') != -1)
          object.category = 'administration';
        else if(object.bereich.indexOf('Bewohnerservicestellen') != -1)
          object.category = 'service';
        else if(object.bereich.indexOf('Gymnasien') != -1)
          object.category = 'gym';
        else if(object.bereich.indexOf('Sonderschulen') != -1)
          object.category = 'specialschool';
        else if(object.bereich.indexOf('Hauptschulen') != -1 || object.bereich.indexOf('Volksschulen') != -1 || object.bereich.indexOf('Polytechnische') != -1)
          object.category = 'school';
        else if(object.bezeichnung.indexOf('Polizei') != -1)
          object.category = 'police';
        else if(object.bezeichnung.indexOf('Postamt') != -1)
          object.category = 'post';
        else if(object.bezeichnung.toLowerCase().indexOf('feuerwehr') != -1)
          object.category = 'firestation';
        else if(object.bezeichnung.indexOf('Kraftfahrzeugzulassungsbehörde') != -1)
          object.category = 'truck';
        else if(object.bezeichnung.indexOf('Kurhaus') != -1)
          object.category = 'kurhaus';
        else if(object.bezeichnung.indexOf('Freibad') != -1)
          object.category = 'swimming';
        else if(object.bezeichnung.indexOf('Gericht') != -1 || object.bezeichnung.indexOf('Justiz') != -1)
          object.category = 'justice';
        else if(object.bezeichnung.indexOf('Finanz') != -1)
          object.category = 'finance';
        else
          object.category += 'default';
          
        /* choose correct marker image */
        object.image = 'markers/' + object.category + '.png';

        /* create marker */
        OpenSBG.map.addMarker(OpenSBG.createMarker(object, object.point));
        OpenSBG.bounds.extend(object.point);
        
        /* hide markers on page reload */
        $('.checkbox').each(function() {
          if(!$(this).is(':checked'))
            OpenSBG.hideMarkers($(this).val());
        });
      }