function() {
        localStorage.settings = JSON.stringify({
            'language': this.language,
            'enableTranslationTool': this.enableTranslationTool,
			'quality': this.quality,
			'announceTimeout': this.announceTimeout
        });

        LoadingBar.show();

        params = {
             flattr_automatically: this.flattr_automatically,
             send_new_follower_email: this.send_new_follower_email,
             send_new_subscriber_email: this.send_new_subscriber_email
        };

        $.post('/me/settings', params, function(data) {
            LoadingBar.hide();
        });
    }