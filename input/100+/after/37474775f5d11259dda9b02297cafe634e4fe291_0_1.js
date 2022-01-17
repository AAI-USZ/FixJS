function create_img(eq)
    {
        var img = document.createElement('img');

        // undo some blogger substitutions
        mangled_eq = eq;
        mangled_eq = mangled_eq.replace(/&lt;/g, '<');
        mangled_eq = mangled_eq.replace(/&gt;/g, '>');
        mangled_eq = mangled_eq.replace(/&amp;/g, '&');

        img.setAttribute('src', 'http://latex.codecogs.com/gif.latex?'+encodeURIComponent(mangled_eq));
        img.setAttribute('alt', mangled_eq);
        img.setAttribute('align', 'middle');
        img.setAttribute('border', 0);

        return img;
    }