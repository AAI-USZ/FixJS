function ( selector, context ) {
      if (typeof selector === 'undefined') {
         return document;
      }
      if (selector === window || selector === document) {
         return selector;
      }
      if (typeof selector === 'object' && selector.nodeType === 1) {
         return selector;
      }
      if (!!context) {
         if (typeof context === 'string') {
            return document.querySelector(context + ' ' + selector);
         } else if (context.nodeType === 1) {
            return context.querySelector(selector);
         } 
      } else if (typeof selector === 'function') {
         $.ready(function() {
            return selector.call(selector);
         });
      } else {
         return document.querySelector(selector);
      }
      return this;
   }