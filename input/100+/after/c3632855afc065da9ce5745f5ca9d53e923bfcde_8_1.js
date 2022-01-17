function() {
            $j(this).off().find('span').text('Loading Details...');
            $j(this).find('img').show();
            ManageUserSession.getApiClient().getContactDetailsViaApex(contactId, recordTypeId,
                function(response) {
                    var resp = $j(response);  resp.find('head, script').remove();
                    formatDetailContent(detailsLayout.find('#layout').empty().append(resp));
                    detailsLayout.find('#viewMoreBtn').hide();
                }, errorCallback, function() { initiateInfoScroller(); });
        }