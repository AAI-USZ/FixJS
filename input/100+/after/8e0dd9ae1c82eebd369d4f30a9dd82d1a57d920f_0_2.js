f    if (typeof (track) === 'undefined') track = true;
    var gadgetIframe = document.getElementById(this.getIframeId());
    if (gadgetIframe) {
        var gadgetContent = gadgetIframe.parentNode;
        var gadgetImg = document.getElementById('gadgets-gadget-title-image-' + this.id);
        if (gadgetContent.style.display) {
            //OPEN
            gadgetContent.parentNode.style.width = (my.gadgets[this.id].open_width || 600) + 'px';
            gadgetContent.style.display = '';
            gadgetImg.src = '/' + location.pathname.split('/')[1] + '/ORNG/Images/icon_squareDownArrow.gif';
            // refresh if certain features require so
            //if (this.hasFeature('dynamic-height')) {
            if (my.gadgets[this.id].chrome_id == 'gadgets-search') {
                this.refresh();
                document.getElementById(this.getIframeId()).contentWindow.location.reload(true);
            }

            if (my.gadgets[this.id].view == 'home') {
                if (track) {
                    // record in google analytics             
                    _gaq.push(['_trackEvent', my.gadgets[this.id].name, 'OPEN_IN_EDIT', 'profile_edit_view']);
                }
            }
            else {
                osapi.activities.create(
		  { 'userId': gadgets.util.getUrlParameters()['Person'],
		      'appId': my.gadgets[this.id].appId,
		      'activity': { 'postedTime': new Date().getTime(), 'title': 'gadget viewed', 'body': my.gadgets[this.id].name + ' gadget was viewed' }
		  }).execute(function (response) { });
                // record in google analytics     
                if (track) {
                    _gaq.push(['_trackEvent', my.gadgets[this.id].name, 'OPEN']);
                }
            }
        }
        else {
            //CLOSE
            gadgetContent.parentNode.style.width = (my.gadgets[this.id].closed_width || 600) + 'px';
            gadgetContent.style.display = 'none';
            gadgetImg.src = '/' + location.pathname.split('/')[1] + '/ORNG/Images/icon_squareArrow.gif';
            if (my.gadgets[this.id].view == 'home') {
                if (track) {
                    // record in google analytics     
                    _gaq.push(['_trackEvent', my.gadgets[this.id].name, 'CLOSE_IN_EDIT', 'profile_edit_view']);
                }
            }
            else {
                if (track) {
                    // record in google analytics     
                    _gaq.push(['_trackEvent', my.gadgets[this.id].name, 'CLOSE']);
                }
            }
        }
    }
};
