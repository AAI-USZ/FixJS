function(text, lb) {
         if (lb) return document.createTextNode(text);
         var smileyInfo = self._smileyTable[s];
         var smileyDom = document.createElement('abbrev');
         smileyDom.innerHTML = text.replace(/&/g, '&amp;').
                                    replace(/</g, '&lt;').
                                    replace(/>/g, '&gt;');
         var url = "data:image/png;base64," + smileyInfo.imageDataBase64;
         smileyDom.style.backgroundImage = "url(" + url + ")";
         if (smileyInfo.height !== undefined)
           smileyDom.style.height  = smileyInfo.height + "px";
         if (smileyInfo.width !== undefined)
           smileyDom.style.width   = smileyInfo.width  + "px";
         smileyDom.style.display = 'inline-block';
         smileyDom.style.color   = 'transparent';
         smileyDom.style.overflow = 'hidden';
         return smileyDom;
       }