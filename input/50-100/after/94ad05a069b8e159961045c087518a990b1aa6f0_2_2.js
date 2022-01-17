function htmlDecode(input){
        var e = window.document.createElement('div');
        e.innerHTML = input;
        if (e.querySelector('*')) {
            e.innerHTML = e.textContent
        }
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }