function() {
    var frame = document.createElement('iframe')
    frame.id = 'autopagerize_message_bar'
    frame.style.display = 'none'
    frame.style.position = 'fixed'
    frame.style.bottom = '0px'
    frame.style.left = '0px'
    frame.style.height = '25px'
    frame.style.border = '0px'
    frame.style.opacity = '0.8'
    frame.style.zIndex = '1000'
    frame.width = '100%'
    frame.scrolling = 'no'
    this.messageFrame = frame

    // no icon.
    var u = 'data:text/html;base64,PGh0bWw+CjxoZWFkPgo8c3R5bGU+CmJvZHkgewogIG1hcmdpbjogMDsKICBwYWRkaW5nOiA0cHggMCAwIDEwcHg7CiAgY29sb3I6ICNmZmY7CiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDsKICBmb250LXNpemU6IDEycHg7CiAgdGV4dC1hbGlnbjogY2VudGVyOwp9CmltZyB7CiAgdmVydGljYWwtYWxpZ246IHRvcDsKfQo8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PkxvYWRpbmcuLi48L2JvZHk+CjwvaHRtbD4K'
    if (settings['extension_path']) {
        u = settings['extension_path'] + 'loading.html'
    }
    else if (settings['loading_html']) {
        u = settings['loading_html']
    }
    this.messageFrame.src = u
    document.body.appendChild(frame)
}