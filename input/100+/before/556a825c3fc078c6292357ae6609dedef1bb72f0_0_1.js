function() {
    $('.further_information').hide();
    $('#options-loading').removeClass('hidden');
    $.ajax({
      url: document.location + '.json',
      dataType: 'json',
      data: {
        lat: AlphaGeo.full_location.current_location.lat,
        lon: AlphaGeo.full_location.current_location.lon
      },
      type: 'POST',
      success: function (data) {
        $('#options-loading').addClass('hidden');

        if (data.places.length > 0) {
          $('h3#options-header').show().removeClass('hidden');
          $('#options').html($.mustache($('#option-template').html(), {options: data.places}));
        } else {
          $('#results-error').removeClass('hidden').find('p').text('Sorry, no results were found near you.');
        }
        _gaq.push(['_trackEvent', 'Citizen-Format-Findmynearest', 'Success-results']);
        $('#options-header').show();
      }
    });
  }