function() {
    window.removeEventListener('scroll', this.scroll, false)
    if (this.messageFrame) {
        var mf = this.messageFrame
        var u = 'data:text/html;base64,PGh0bWw+CjxoZWFkPgo8c3R5bGU+CmJvZHkgewogIG1hcmdpbjogMDsKICBwYWRkaW5nOiA0cHggMCAwIDEwcHg7CiAgY29sb3I6ICNmZmY7CiAgYmFja2dyb3VuZC1jb2xvcjogI2EwMDsKICBmb250LXNpemU6IDEycHg7CiAgdGV4dC1hbGlnbjogY2VudGVyOwp9CmltZyB7CiAgdmVydGljYWwtYWxpZ246IHRvcDsKfQo8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PkVycm9yITwvYm9keT4KPC9odG1sPgo='
        if (settings['extension_path']) {
            u = settings['extension_path'] + 'error.html'
        }
        else if (settings['error_html']) {
            u = settings['error_html']
        }
        mf.src = u
        mf.style.display = 'block'
        setTimeout(function() {
            if (mf) {
                mf.parentNode.removeChild(mf)
            }
        }, 3000)
    }
}