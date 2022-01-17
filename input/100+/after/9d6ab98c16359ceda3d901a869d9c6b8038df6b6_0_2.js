function inline (elements, context, keep_inlined) {
        var el, styles, style_str, s, inlined = 0;

        if ( typeof elements === 'string' ) {
            //get the elements if it's only a selector
            elements = toArray($get(elements, context));
        }
        // if it's a single element then stick it in an array
        else if ( elements.nodeType ) {
            elements = [elements];
        }

        // loop over the elements
        while ( el = elements.shift() ) {
            styles = getUsedValues(el);
            style_str = '';
            for ( s in styles ) {
                style_str += s + ':' + styles[s] + ';';
            }
            style_str && el.setAttribute('style', style_str);
            inlined += 1;
        }
        return inlined;
    }