function() {
    window.removeEventListener('scroll', this.scroll, false)
    if (this.messageFrame) {
        var mf = this.messageFrame
        var u = settings['extension_path'] ?
            settings['extension_path'] + 'error.html' :
            'http://autopagerize.net/files/error.html'
        mf.src = u
        mf.style.display = 'block'
        setTimeout(function() {
            if (mf) {
                mf.parentNode.removeChild(mf)
            }
        }, 3000)
    }
}