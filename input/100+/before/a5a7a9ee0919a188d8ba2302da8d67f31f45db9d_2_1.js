function() {
    var tools = $('#toolspanel .tool');

    // go through each tool panel and add opne/close behaviour to the header
    tools.each( function(index, tool) {
        tool = $(tool);
        var header = $(tool).children('h1').first();
        var body = tool.children('.toolcontent').first();
        header.disableSelection();
        header.click( function() {
            header.toggleClass('closed');
            body.toggle('blind', 'fast');
            return false;
        });
    });

    //
    // close all the tools that wanted to start closed
    //

    var fx = jQuery.fx.off; // disable fx animation
    jQuery.fx.off = true;
    var closetools = $('#toolspanel .tool.startclosed');
    closetools.each( function(index, tool) {
        // click the header of each tool to close it
        $(tool).children('h1').first().click();
    });
    // restore fx animation
    jQuery.fx.off = fx;

    //
    // set up the emission selecting stuff
    //
    Edgar.yearSlider = new Edgar.YearSlider({
        sliderElem: '#year_slider',
        scenarioElem: '#emission_scenarios',
        map: Edgar.map,
        yearLabelElem: '#year_label'
    });

    $('#use_emission_and_year').change(function(){
        var sid = null;
        if($(this).is(':checked'))
            sid = Edgar.mapdata.species.id;
        Edgar.yearSlider.setSpeciesId(sid);
    });

    $('#use_emission_and_year').change(reloadDistributionLayers);

    Edgar.mapdata.emissionScenario = $('#emission_scenarios').val();
    Edgar.mapdata.year = parseInt($('#year_selector').val());
    reloadDistributionLayers();

    $('#play_slider_button').click(function(){
        Edgar.yearSlider.playAnimation();
    });

    // test the mode changing stuff
    $('#go').click( function() {
        $(Edgar.map).trigger('changemode', 'current');
        setTimeout(function() {
            $(Edgar.map).trigger('changemode', 'vetting');
        }, 3000);
    });

}