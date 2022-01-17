function(red, green, blue, alpha) {
        red = typeof red === 'undefined' ? 255.0 : red;
        green = typeof green === 'undefined' ? 255.0 : green;
        blue = typeof blue === 'undefined' ? 255.0 : blue;
        alpha = typeof alpha === 'undefined' ? 255.0 : alpha;
        return new Color(red / 255.0, green / 255.0, blue / 255.0, alpha / 255.0);
    }