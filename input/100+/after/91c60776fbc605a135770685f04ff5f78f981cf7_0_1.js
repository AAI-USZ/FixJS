function() {
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    var markerId = $(this).data('cidade');
    navigateFilter(lat, lon, 8, markerId);

    $('select.cidade option').attr('selected', false);
    $('select.cidade option[value="' + markerId + '"]').attr('selected', true);
    $('select.cidade').chosen().trigger('liszt:updated').change();

}