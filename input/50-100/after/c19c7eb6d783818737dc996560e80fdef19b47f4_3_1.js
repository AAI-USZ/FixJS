function (screen) {
        // set default values
        var duration = 0.3,
            timing = 'ease-out',
			s = screen.style;
		s['-webkit-animation-name']            = 'bbUI-fade-out';
		s['-webkit-animation-duration']        = duration + 's';
		s['-webkit-animation-timing-function'] = timing; 
		s['-webkit-transform'] = 'translate3d(0,0,0)';
		s['-webkit-backface-visibility'] = 'hidden';
    }