function createListItem(torrent) {
    var rv = '';
    var percent = new Number(torrent.percentDone * 100).toFixed(2);
    var recheckProgress = new Number(torrent.recheckProgress * 100).toFixed(2);
    var dlSpeed = new Number(torrent.rateDownload / 1024).toFixed(2);
    var ulSpeed = new Number(torrent.rateUpload / 1024).toFixed(2);
    var classes = '';
    
    rv += '<div class="list-item" name="' + torrent.id +'">';
    rv += '<div class="name">' + torrent.name + '</div>';
    rv += '<div class="percent"> ' + percent + '%</div>';
    rv += '<div class="clear"></div>';
    
    // queue buttons if RPC supports it
    if (RPC_VERSION == 14)
        rv += '<div class="button queue-up torrent"></div><div class="button queue-down torrent"></div>';

    // progress bar
    classes = 'progress-bar';
    if (torrent.status == TR_STATUS_DOWNLOAD)
        classes += ' downloading';
    else if (torrent.status == TR_STATUS_SEED)
        classes += ' seeding';
    else if (torrent.status == TR_STATUS_CHECK || torrent.status == TR_STATUS_CHECK_WAIT)
        classes += ' verifying';
    else
        classes += ' paused';
    
    // add custom class for progress bar if RPC supports queue
    if (RPC_VERSION == 14)
        classes += ' v14';
        
    rv += '<div class="' + classes + '">';
    
    rv += '<hr style="width: ' + Math.round(torrent.percentDone * 100) + '%;"></hr>';
    rv += '</div>';
    
    // build pause/resume button
    if (torrent.status == TR_STATUS_STOPPED)
        rv += '<div class="button resume torrent"></div>';
    else
        rv += '<div class="button pause torrent"></div>';
    rv += '<div class="button remove torrent"></div>';
    rv += '<div class="clear"></div>';
    
    // build status info bar
    if (torrent.status == TR_STATUS_CHECK_WAIT) {
        rv += '<div>Verifying local data (queued)</div>';
    }
    else if (torrent.status == TR_STATUS_CHECK) {
        rv += '<div>Verifying local data (' + recheckProgress + '%)</div>';
    }
    else if (torrent.status == TR_STATUS_DOWNLOAD_WAIT) {
        rv += '<div>Queued for download</div>';
    }
    else if (torrent.status == TR_STATUS_SEED_WAIT) {
        rv += '<div>Queued for seed</div>';
    }
    else {
        rv += '<div class="peer-wrapper">';
        if (torrent.status == TR_STATUS_DOWNLOAD)
            rv += torrent.peersSendingToUs + '&#8595;';
        if (torrent.status == TR_STATUS_DOWNLOAD || torrent.status == TR_STATUS_SEED)
            rv += ' ' + torrent.peersGettingFromUs + '&#8593;';
        if (torrent.status == TR_STATUS_DOWNLOAD || torrent.status == TR_STATUS_SEED)
            rv += ' of ' + torrent.peersConnected + " peers";
        rv += '</div><div class="speed-wrapper">';
        if (torrent.status == TR_STATUS_DOWNLOAD)
            rv +=  ' ' + dlSpeed + ' KB/s &#8595;';
        if (torrent.status == TR_STATUS_DOWNLOAD || torrent.status == TR_STATUS_SEED)
            rv += ' ' + ulSpeed + ' KB/s &#8593;';
        rv += '</div>';
        rv += '<div class="clear"></div>';
    }
    rv += '</div>';
    
    return rv;
}