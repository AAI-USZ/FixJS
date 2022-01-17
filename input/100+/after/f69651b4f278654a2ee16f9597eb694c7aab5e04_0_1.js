function DataController (mapController) {
    var instance = this;
    this.data = null;
    // start on the first page
    this.page = 0;
    this.filters = {};
    this.mapController = mapController;

    $.ajax({
        url: '/api/ntdagencies/agencies',
        dataType: 'json',
        success: function (data) {
            console.log('received json');
            instance.data = data;

            // lose the loading text
            $('#loading').remove();
            
            // hide the next page button if need be
            if (data.length < DataController.PAGE_SIZE)
                $('#nextPage').fadeOut();

            // there won't be any filters yet, but we still have to do this
            instance.getFilteredData();
            instance.sortBy('metro');
        },
        error: function (xhr, textStatus) {
            console.log('Error retrieving JSON: ', textStatus);
        }
    });

    // set up the sort buttons
    $('.sortBtn').click(function (e) {
        // don't go to the top of the page
        e.preventDefault();

        // e.currentTarget is a DOM element not a jQ        
        var field = e.currentTarget.name;
        var desc = false;

        // two clicks on the head sorts descending
        if (instance.sortedBy == field && instance.descending == false)
            desc = true;

        instance.sortBy(e.currentTarget.name, desc);
    });

    $('#filters li a').click(function (e) {
        var filter = e.currentTarget.name;
        var opposite = e.currentTarget.getAttribute('opposite');

        if (instance.filters[filter]) {
            instance.filters[filter] = false;
            $(e.currentTarget).find('.ui-icon').removeClass('ui-icon-check')
                .addClass('ui-icon-blank')
                .text('Disabled filter');
        }
        else {
            instance.filters[filter] = true;
            $(e.currentTarget).find('.ui-icon').addClass('ui-icon-check')
                .removeClass('ui-icon-blank')
                .text('Enabled filter');
        }

        if (opposite != null) {
            $('#filters li').find('[name="' + opposite + '"]')
                .find('.ui-icon').removeClass('ui-icon-check')
                .addClass('ui-icon-blank')
                .text('Disabled filter');

            instance.filters[opposite] = false;
        }

        instance.getFilteredData();
        instance.sortBy(instance.sortedBy, instance.descending);
    });

    // hide a shown agency upon request
    $('#agencyClose').click(function (e) {
        e.preventDefault();
        
        $('#agencyInfo').hide('drop');
        $('#tabs').fadeIn();
    });
        
}