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
    var u = settings['extension_path'] ?
        settings['extension_path'] + 'loading.html' :
        'http://autopagerize.net/files/loading.html'
    this.messageFrame.src = u
    document.body.appendChild(frame)
}