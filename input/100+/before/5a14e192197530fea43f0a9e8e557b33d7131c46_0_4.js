function highlightWord(node, word, doc) 
{
    doc = typeof(doc) != 'undefined' ? doc : document;
    var hinodes = [], coll;
    // Iterate into this nodes childNodes
    if (node.hasChildNodes) 
    {
        var hi_cn;
        for (hi_cn=0; hi_cn < node.childNodes.length; hi_cn++) 
        {
            coll = highlightWord(node.childNodes[hi_cn],word,doc);
            hinodes = hinodes.concat(coll);
        }
    }

    // And do this node itself
    if (node.nodeType == 3) // text node
    { 
        tempNodeVal = stripVowelAccent(node.nodeValue.toLowerCase());
        tempWordVal = stripVowelAccent(word.toLowerCase());
        ni = tempNodeVal.indexOf(tempWordVal);
        
        if (ni != -1) 
        {
            nv = node.nodeValue;
            highlightRange.setStart(node, ni);
            highlightRange.setEnd(node, ni+word.length);
            if (highlightRange) {
                selection.removeAllRanges();
                selection.addRange(highlightRange);
            }
            highlight();
        }
    }
    return hinodes;
}