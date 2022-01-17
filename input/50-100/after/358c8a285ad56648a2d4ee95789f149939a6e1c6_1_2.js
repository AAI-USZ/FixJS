function(red, green, blue, alpha) {
        red = defaultValue(red, 255.0);
        green = defaultValue(green, 255.0);
        blue = defaultValue(blue, 255.0);
        alpha = defaultValue(alpha, 255.0);
        return new Color(red / 255.0, green / 255.0, blue / 255.0, alpha / 255.0);
    }