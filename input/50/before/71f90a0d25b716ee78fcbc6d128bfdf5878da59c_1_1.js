function readySite(data){
    var iframe = $("#"+String(data.site_id));
    insertHTMLIntoIframe(data.src,iframe);
    Notes.push(data.notes);
}