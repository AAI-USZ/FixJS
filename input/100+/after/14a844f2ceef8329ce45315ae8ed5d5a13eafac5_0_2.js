function(e) {
                if (e.keyCode == 13) {  // 13 = Enter
                    if (-1 != this.value.indexOf("/")) {
                        if (-1 != this.value.search(/^\//)) {
                            window.location.href = this.value;
                        } else {
                            window.location.href = "/" + this.value;
                        }
                    } else {
                        var path = "/" + githubUser() + "/" + this.value;
                        window.location.href = path;
                    }
                } else if (e.keyCode == 27) {  // 27 = Escape
                    this.blur();
                    document.body.removeChild(this);
                }
            }