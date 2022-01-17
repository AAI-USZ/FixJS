function dispSelection(text) {
    var div = document.createElement('div');
    div.setAttribute('class', 'selected');
    div.setAttribute('id', 'selected');
    div.setAttribute('style','display:block');
    div.innerHTML = text;
    var p = document.createElement('p');
    p.setAttribute('id','snip-content');
    //div.appendChild(txt);
    var a = document.createElement('a');
    a.title = "URL";
    getURL(function (URL) {
	a.innerHTML = URL;
	a.href = URL;
    });    
    p.appendChild(a)
    div.insertBefore(p, div.firstChild);
    document.body.appendChild(div);
}