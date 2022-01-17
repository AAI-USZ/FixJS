function() {
          target.toggleClass('on');
          if (tag !== '') {
            return location.href = "javascript:void(function(){pixiv.tag.toggle('" + (encodeURI(tag)) + "')})();";
          }
        }