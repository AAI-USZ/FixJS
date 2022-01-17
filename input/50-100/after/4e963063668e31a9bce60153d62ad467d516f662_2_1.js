function(request, sender, sendResponse) {
    // count scripts, css
    var data = build_response(get_js(), get_css());

    // get html too
    data.html = [{"inline":get_dom(), "count":document.getElementsByTagName('*').length}];

    sendResponse(data);
}