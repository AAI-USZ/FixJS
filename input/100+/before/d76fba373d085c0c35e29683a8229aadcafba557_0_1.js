function separate_script_tags(text) {
    /*
    Find all the tags in the given script and return a list of two
    strings.  The first string is the html in text, the second is the
    contents of any <script>...</script> tags.

    INPUT:
        text -- string
    OUTPUT
        list of two strings:
            [text w/o script tags (but includes math/tex script tags), content of script tags]
    */
    var i, j, k, left_tag, right_tag, s, script, new_text, script_end, left_match;

    left_tag = new RegExp(/<(\s)*script(.*)?>/i);
    right_tag = new RegExp(/<(\s*)\/(\s*)script(\s)*>/i);

    script = '';
    new_text='';
    s = text;
    i = s.search(left_tag);
    while (i !== -1) {
        left_match = s.match(left_tag);
        j = s.search(right_tag);
        k = i + (left_match[0] + '').length;
	script_end=j + (s.match(right_tag)[0] + '').length;
        if (j === -1 || j < k) {
            break;
        }
        // MathJax uses the script tag with a type='math/tex(display|inline)'
        // to encode characters (as a sort of CDATA thing).  We *don't* want
        // to extract these script tags since they need to appear inline.
        if (!left_match[2] ||  left_match[2].indexOf('math/tex') === -1) {
            script += s.slice(k, j);
	    new_text += s.slice(0, i);
	} else {
	    new_text += s.slice(0, script_end);
	}
        s = s.slice(script_end);
        i = s.search(left_tag);
    }
    new_text+=s;
    return [new_text, script];
}