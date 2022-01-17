function light_switch() {
        if(lights === 'off') {
            $('body').css('background', prefs['light_color']);
            lights = 'on';
        } else if(lights === 'on') {
            $('body').css('background', prefs['bg_color']);
            lights = 'off';
        }
    }