function( $ ) {
  
  "use strict";
  
  $.extend({
    addReferences: function (node, re, trigger, triggerData) {
      
      var match;
      var highlight;
      
      if (node.nodeType === 3) { // new text nodes
        match = node.data.match(re);
        if (match) {
          highlight = document.createElement('span');
          var wordNode = node.splitText(match.index);
          wordNode.splitText(match[0].length);
          var wordClone = wordNode.cloneNode(true);
          highlight.appendChild(wordClone);
          wordNode.parentNode.replaceChild(highlight, wordNode);
          
          highlight = $(highlight);


          highlight.addClass('reference-link ' + triggerData.theme).addClass('on-' + trigger);
          var tagData = {}; tagData[trigger] = triggerData;
          highlight.data('referenceTriggers', $.extend(true, {}, tagData));

          
      
          return 1; //skip added node in parent
        }
      } else if ($(node).hasClass('reference-link') && $(node).data('referenceTriggers')) { // already highlighted text nodes 

        match = $(node).text().match(re);
        
        if (match) {
          highlight = $(node);
          if(highlight.data('referenceTriggers')[trigger]) {
            highlight.data('referenceTriggers')[trigger].collections.push(triggerData.collections[0]);
            // add to collections
            highlight.data('referenceTriggers')[trigger].theme = triggerData.theme;
            // replace theme
          } else {
            highlight.data('referenceTriggers')[trigger] = $.extend(true, {}, triggerData);
          }
        }
        
        
      } else if ((node.nodeType === 1 && node.childNodes) && !/(script|style)/i.test(node.tagName)) {
        for (var i = 0; i < node.childNodes.length; i++) {
          i += $.addReferences(node.childNodes[i], re, trigger, triggerData);
        }
      }
      return 0;
    }
  });
  
  
  
  $.fn.addReferences = function(o){
    
    var searchEl = $(this);
    
    var options = {
      collections: [],
      trigger: 'click',
      theme: 'apple',
      exactMatch: true
    };
    
    $.extend(options, o);
    
    $.each(options.collections, function(index, value){
    
      var collection;
      if($.inArray(value, $.referenceCollections) === -1) {
        collection = $.addReferenceCollection(value);
      } else {
        collection = value;
      }
      
      /*******************************************
      Build the search expression
      ********************************************/
      
      var terms = collection.keys;
      
      // escape special characters in search terms
      terms = jQuery.map(terms, function(word, i) {
        if(word.charAt(0) == '/' && word.charAt(word.length-1) == '/'){
          return word.substr(1,word.length-2)
        }
        return word.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      });

      var pattern = "(" + terms.join("|") + ")";
      if (options.exactMatch) {
        pattern = "\\b" + pattern + "\\b";
      }
      
      var re = new RegExp(pattern, collection.caseSensitive ? "" : "i");
      
      var triggerData = {
        theme: options.theme,
        collections: [collection.id]
      };
      
      /*******************************************
      Add the reference links
      ********************************************/
      
      searchEl.each(function () {
        jQuery.addReferences(this, re, options.trigger, triggerData);
      });
  
    });
    

      
      

      
    /*******************************************
    Bind reference to links
    ********************************************/
    
    
    var triggerBound = false;
    if(searchEl.data('events') && searchEl.data('events')[options.trigger]){
      $.each(searchEl.data('events')[options.trigger], function(i){
        if(this.selector === ".reference-link.on-" + options.trigger) {
          triggerBound = true;
        }
      });
    }
    
    if(!triggerBound) {
      searchEl.on(options.trigger, ".reference-link.on-" + options.trigger, $.fn.reference);
    
      $(document).on(options.trigger, $.fn.closeReferences);
    }
    
    
    
    
    return $(this);
  };
  
  $.fn.removeReferences = function(o){
    
    return $(this);
  };
  
}