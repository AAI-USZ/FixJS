function readySite(data){
    var iframe = $("#"+String(data.site_id));
    insertHTMLIntoIframe(data.src,iframe);
    $(iframe[0].contentWindow.document.head).prepend('<meta http-equiv="Content-type" content="text/html;charset=UTF-8">')
    Notes[data.site_id] = data.notes;
}