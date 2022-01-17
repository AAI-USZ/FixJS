function renderContactLayout(contactId, recordTypeId) {
    
    var detailsLayout = $j('#rightsection #detailpage #detail #info #detailsLayout');
    detailsLayout.find('#layout').empty();
    detailsLayout.find('#viewMoreBtn').find('span').text('Load All Details');
    detailsLayout.find('#viewMoreBtn').find('img').hide();
    detailsLayout.find('#viewMoreBtn').show().unbind().click(
        function() {
            $j(this).unbind().find('span').text('Loading Details...');
            $j(this).find('img').show();
            ManageUserSession.getApiClient().getContactDetailsViaApex(contactId, recordTypeId,
                function(response) {
                    var resp = $j(response);  resp.find('head, script').remove();
                    formatDetailContent(detailsLayout.find('#layout').empty().append(resp));
                    detailsLayout.find('#viewMoreBtn').hide();
                }, errorCallback, function() { initiateInfoScroller(); });
        });
}