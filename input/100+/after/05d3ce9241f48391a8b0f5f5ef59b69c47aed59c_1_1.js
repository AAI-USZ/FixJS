function (node, re, trigger, triggerData) {
      

      
      if (node.nodeType === 3) { // new text nodes
        var match = node.data.match(re);
        if (match) {
          var highlight = document.createElement('span');
          var wordNode = node.splitText(match.index);
          wordNode.splitText(match[0].length);
          var wordClone = wordNode.cloneNode(true);
          highlight.appendChild(wordClone);
          wordNode.parentNode.replaceChild(highlight, wordNode);
          
          highlight = $(highlight);
		  
          highlight.addClass('reference-link ' + triggerData.theme).addClass('on-' + trigger)
          var tagData = {}; tagData[trigger] = triggerData;
          highlight.data('referenceTriggers', $.extend(true, {}, tagData))

          
		  
          return 1; //skip added node in parent
        }
      } else if ($(node).hasClass('reference-link') && $(node).data('referenceTriggers')) { // already highlighted text nodes 

        var match = $(node).text().match(re);
        
        if (match) {
          var highlight = $(node);
          if(highlight.data('referenceTriggers')[trigger]) {
            $.unique($.extend(highlight.data('referenceTriggers')[trigger]['collections'], triggerData['collections']))
            // add to collections
            highlight.data('referenceTriggers')[trigger]['theme'] = triggerData['theme'];
            // replace theme
          } else {
            highlight.data('referenceTriggers')[trigger] = triggerData;
          }
        } else {
          
          
        }
        
        
      } else if ((node.nodeType === 1 && node.childNodes) && !/(script|style)/i.test(node.tagName)) {
        for (var i = 0; i < node.childNodes.length; i++) {
          i += $.addReferences(node.childNodes[i], re, trigger, triggerData);
        }
      }
      return 0;
    }