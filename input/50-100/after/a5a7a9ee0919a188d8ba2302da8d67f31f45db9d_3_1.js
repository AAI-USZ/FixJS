function() {
    initExistingVettingInterface();
    initNewVettingInterface();

    // test the mode changing stuff
    $('#vet').click( function() {
        $(Edgar.map).trigger('changemode', 'vetting');
    });

    $('#devet').click( function() {
        $(Edgar.map).trigger('changemode', 'current');
    });

}