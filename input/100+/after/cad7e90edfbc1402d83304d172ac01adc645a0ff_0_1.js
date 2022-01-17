function(htmlDoc, page) {
    var HTML_NS  = 'http://www.w3.org/1999/xhtml'
    var hr = document.createElementNS(HTML_NS, 'hr')
    var p  = document.createElementNS(HTML_NS, 'p')
    hr.setAttribute('class', 'autopagerize_page_separator')
    p.setAttribute('class', 'autopagerize_page_info')
    var self = this

    if (getRoot(this.insertPoint) != document) {
        var lastPageElement = getElementsByXPath(this.info.pageElement).pop()
        if (lastPageElement) {
            this.insertPoint = lastPageElement.nextSibling ||
                lastPageElement.parentNode.appendChild(document.createTextNode(' '))
        }
    }

    if (page[0] && /tr/i.test(page[0].tagName)) {
        var insertParent = this.insertPoint.parentNode
        var colNodes = getElementsByXPath('child::tr[1]/child::*[self::td or self::th]', insertParent)

        var colums = 0
        for (var i = 0, l = colNodes.length; i < l; i++) {
            var col = colNodes[i].getAttribute('colspan')
            colums += parseInt(col, 10) || 1
        }
        var td = document.createElement('td')
        // td.appendChild(hr)
        td.appendChild(p)
        var tr = document.createElement('tr')
        td.setAttribute('colspan', colums)
        tr.appendChild(td)
        insertParent.insertBefore(tr, this.insertPoint)
    }
    else {
        this.insertPoint.parentNode.insertBefore(hr, this.insertPoint)
        this.insertPoint.parentNode.insertBefore(p, this.insertPoint)
    }

    p.innerHTML = 'page: <a class="autopagerize_link" href="' +
        this.requestURL.replace(/&/g, '&amp;') + '">' + (++this.pageNum) + '</a>'
    return page.map(function(i) {
        var pe = document.importNode(i, true)
        self.insertPoint.parentNode.insertBefore(pe, self.insertPoint)
        var ev = document.createEvent('MutationEvent')
        ev.initMutationEvent('AutoPagerize_DOMNodeInserted', true, false,
                             self.insertPoint.parentNode, null,
                             self.requestURL, null, null)
        pe.dispatchEvent(ev)
        return pe
    })
}