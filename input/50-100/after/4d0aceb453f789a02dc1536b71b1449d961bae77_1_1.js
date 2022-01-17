function (arg) {
        if (arg === 'video') {
            this.toPage(PAGES.VIDEO)
        } else if (arg === 'audio') {
            this.toPage(PAGES.AUDIO)
        } else if (arg === 'photo') {
            this.toPage(PAGES.PHOTO)
        }
    }