function(deg) {
        let arrows = ["\u2191", "\u2197", "\u2192", "\u2198", "\u2193", "\u2199", "\u2190", "\u2196"];
        let letters = [_('N'), _('NE'), _('E'), _('SE'), _('S'), _('SW'), _('W'), _('NW')];
        let idx = Math.round(deg / 45) % arrows.length;
        switch (this._wind_dir_indicators) {
        case ARROWS:
        	return arrows[idx];
        case LETTERS:
        	return letters[idx];
        }
    }