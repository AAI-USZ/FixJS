function(e) {
                if (e.keyCode == 13) {  // 13 = Enter
                    if (-1 != this.value.indexOf('/')) {
                        if (-1 != this.value.search(/^\//)) {
                            window.location = this.value;
                        } else {
                            window.location = "/" + this.value;
                        }
                    } else {
                        var path = "/" + githubUser() + "/" + this.value;
                        window.location = path;
                    }
                } else if (e.keyCode == 27) {  // 27 = Escape
                    this.blur();
                    document.body.removeChild(this);
                }
            }