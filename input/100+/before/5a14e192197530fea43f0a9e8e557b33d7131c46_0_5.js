function localSearchHighlight(searchStr, singleWordSearch, doc) 
{
    var MAX_WORDS = 50; //limit for words to search, if unlimited, browser may crash
    doc = typeof(doc) != 'undefined' ? doc : document;
    
    if (!doc.createElement) 
    {
        return;
    }
    
    // Trim leading and trailing spaces after unescaping
    searchstr = unescape(searchStr).replace(/^\s+|\s+$/g, "");
    
    if( searchStr == '' ) 
    {
        return;
    }
    
    //majgis: Single search option
    if(singleWordSearch)
    {
        phrases = searchStr.replace(/\+/g,' ').split(/\"/);
    }
    else
    {
        phrases = ["",searchStr];
    }
    
    var hinodes = [];
    
    for(p=0; p < phrases.length; p++) 
    {
        phrases[p] = unescape(phrases[p]).replace(/^\s+|\s+$/g, "");
        
        if( phrases[p] == '' ) 
        {
            continue;
        }
        
        if( p % 2 == 0 ) 
        {
            words = phrases[p].replace(/([+,()]|%(29|28)|\W+(AND|OR)\W+)/g,' ').split(/\s+/);
        }
        else 
        { 
            words=Array(1); 
            words[0] = phrases[p]; 
        }
        
        //limit length to prevent crashing browser
        if (words.length > MAX_WORDS)
        {
            words.splice(MAX_WORDS - 1, phrases.length - MAX_WORDS);
        }
        
        for (w=0; w < words.length; w++) 
        {
            if( words[w] == '' ) 
            {
                continue;
            }
            
            hinodes = highlightWord(doc.getElementsByTagName("body")[0], words[w], doc);
        }
    }
    
    selection.removeAllRanges();
    var oldSelection = document.getElementById("mySelectedSpan");
    var reselectRange = document.createRange();
    reselectRange.selectNode(oldSelection);
    selection.addRange(reselectRange);
}