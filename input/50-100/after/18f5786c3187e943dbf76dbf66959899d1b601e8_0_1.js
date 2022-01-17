function addStyleLink(href) {
    var head, link;
    head = document.getElementsByTagName('head')[0];
    if (!head) { head = document.getElementsByTagName('body')[0]; } // headless body found in topless bar
    if (!head) { return; }
    link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'all';
    link.href = href;
    head.appendChild(link);
}