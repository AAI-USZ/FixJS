function smartGrabHighlightedText(){
   textObject = window.getSelection().getRangeAt(0);
   var text = String(textObject);
   return text

   //this is still a bit sketchy, another days work.
   if (text[0] == " "){
       text = ltrim(text);
   }else{

       var startIndex = textObject.startOffset;
       var spaceIndices = [];
       var startContainerText = textObject.startContainer.textContent;
       $.each(startContainerText, function(i,character){
            if (character==" ") {
                spaceIndices.push(i);
                if (i >= startIndex){
                    return false
                }
            }
       });
       nextSpaceIndex= spaceIndices.pop();
       previousSpaceIndex = spaceIndices.pop();
       if (nextSpaceIndex && previousSpaceIndex){
        if ((previousSpaceIndex + 1) !== startIndex){
            var wholeWord = startContainerText.slice(previousSpaceIndex+1,nextSpaceIndex);
            text = wholeWord.concat(text.substr(nextSpaceIndex-startIndex, text.length -1));
            }
        }else{
           var wholeWord = startContainerText;
           text = wholeWord.concat(text.substr(startContainerText.length-startIndex, text.length -1));
       }
   }
    if (text[text.length-1] == " "){
       text = rtrim(text);
   }else{
       var endIndex = textObject.endOffset;
       spaceIndices = [];
       var endContainerText = textObject.endContainer.textContent;
       $.each(endContainerText, function(i,character){
            if (character==" ") {
                spaceIndices.push(i);
                if (i>=endIndex){
                    return false
                }
            }
       });

       nextSpaceIndex= spaceIndices.pop();
       previousSpaceIndex = spaceIndices.pop();

        if (nextSpaceIndex && previousSpaceIndex){
            if ((nextSpaceIndex - 1) !== endIndex){
                var wholeWord = endContainerText.slice(previousSpaceIndex+1,nextSpaceIndex);
                text = text.substr(0, text.length - (endIndex-previousSpaceIndex)).concat(" " + wholeWord);
                }
        }else{
            var wholeWord = endContainerText;
            text = text.substr(0, text.length - endIndex).concat(wholeWord);
        }

   }
   return text
}