function light_switch() {
        if(lights === 'off') {
            $('body').css('background-color', prefs['light_color']);
            lights = 'on';
        } else if(lights === 'on') {
            $('body').css('background-color', prefs['bg_color']);
            lights = 'off';
        }
    }