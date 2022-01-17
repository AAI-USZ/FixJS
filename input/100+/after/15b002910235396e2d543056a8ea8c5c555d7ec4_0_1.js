function(panel, upload_allowed) {
    // handles: details, browse, search, external, email, anchor, upload, advanced
    var correction_length;

    // handle upload button
    if ((upload_allowed === true || upload_allowed === undefined) && ((panel === "browse" || panel === "details") && this.is_search_activated === false)) {
        jq('#upload', document).attr('disabled', false).fadeTo(1, 1);
    } else {
        jq('#upload', document).attr('disabled', true).fadeTo(1, 0.5);
    }

    // handle email panel
    if (panel === "email") {
        jq('#email_panel', document).removeClass('hide');
        jq('#insert-selection', document).removeAttr('disabled');
    } else {
        jq('#email_panel', document).addClass('hide');
    }
    // handle anchor panel
    if (panel === "anchor") {
        jq('#anchor_panel', document).removeClass('hide');
        jq('#insert-selection', document).removeAttr('disabled');
    } else {
        jq('#anchor_panel', document).addClass('hide');
    }
    // handle external panel
    if (panel === "external") {
        jq('#external_panel', document).removeClass('hide');
        jq('#insert-selection', document).removeAttr('disabled');
    } else {
        jq('#external_panel', document).addClass('hide');
    }
    // handle advanced panel
    if (panel === "advanced") {
        jq('#advanced_panel', document).removeClass('hide');
    } else {
        jq('#advanced_panel', document).addClass('hide');
    }
    // show details panel, if an entry is selected and we
    // return from the advanced panel
    checkedlink = jq("input:radio[name=internallink]:checked", document);
    if ((checkedlink.length === 1) && (panel === "browse")) {
      this.setDetails(jq(checkedlink).attr('value'));
    }
    
    // handle browse panel
    if (jq.inArray(panel, ["search", "details", "browse", "upload"]) > -1) {
        if (jq.inArray(panel, ["upload", "details"]) > -1) {
            jq('#browseimage_panel #general_panel', document).removeClass('width-full').addClass('width-3:4');
        } else {
            jq('#browseimage_panel #general_panel', document).removeClass('width-3:4').addClass('width-full');;
        }
        jq('#browseimage_panel', document).removeClass('hide').addClass('row');
        jq('#insert-selection', document).attr('disabled','disabled');
        jq('#upload-button', document).removeClass('hide');
    } else {
        jq('#browseimage_panel', document).removeClass('row').addClass('hide');
        jq('#upload-button', document).addClass('hide');
    }
    
    // handle details/preview panel
    if (panel === 'details') {
        jq('#details_panel', document).removeClass('hide');
        jq('#insert-selection', document).removeAttr('disabled');
    } else {
        jq('#details_panel', document).addClass('hide');
    }
    // handle upload panel
    if (panel === "upload") {
        jq('#addimage_panel', document).removeClass('hide');
    } else {
        jq('#addimage_panel', document).addClass('hide');
    }
}