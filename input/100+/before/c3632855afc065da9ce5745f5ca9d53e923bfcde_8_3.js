function addLeftNavClickListeners(contact) {
    $j('#rightsection #detailpage #leftnav .dsIcons').unbind('click')
        .click(function() {     
            
            var loadingText = 'Loading';
            switch (this.id) {
                case 'info': loadingText += ' Details'; break;
                case 'rss': loadingText += ' All Feeds'; break;
                case 'chatter': loadingText += ' Chatter'; break;
                case 'salesforce': loadingText += ' Activities'; break;
            }
            
            var ind = $j('#rightsection #detailpage').showActivityInd(loadingText + '...');
            switchDetailSection(this.id, contact, ind.hide); 
        });
    if (!hasChatterEnabled) $j('#rightsection #detailpage #leftnav #chatter').hide();
}