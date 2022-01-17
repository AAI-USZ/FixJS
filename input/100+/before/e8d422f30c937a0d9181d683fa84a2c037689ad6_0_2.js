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
    } else {
        jq('#email_panel', document).addClass('hide');
    }
    // handle anchor panel
    if (panel === "anchor") {
        jq('#anchor_panel', document).removeClass('hide');
    } else {
        jq('#anchor_panel', document).addClass('hide');
    }
    // handle external panel
    if (panel === "external") {
        jq('#external_panel', document).removeClass('hide');
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
    // handle details/preview panel
    if (panel === 'details') {
        jq('#details_panel', document).removeClass("hide");
    } else {
        jq('#details_panel', document).addClass("hide");
    }
    // handle upload panel
    if (panel === "upload") {
        jq('#addimage_panel', document).removeClass('hide');
    } else {
        jq('#addimage_panel', document).addClass('hide');
    }
    // handle browse panel
    if (jq.inArray(panel, ["search", "details", "browse", "upload"]) > -1) {
        correction_length = this.is_link_plugin ? 150 : 0;
        if (jq.inArray(panel, ["upload", "details"]) > -1) {
            jq('#browseimage_panel', document).width(545 - correction_length);
        } else {
            jq('#browseimage_panel', document).width(780 - correction_length);
        }
        jq('#browseimage_panel', document).removeClass("hide");
    } else {
        jq('#browseimage_panel', document).addClass("hide");
    }
}