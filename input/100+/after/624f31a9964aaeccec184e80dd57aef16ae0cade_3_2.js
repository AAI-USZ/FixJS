function(regexp, d){
          content = content.replace(regexp, function(match, startSpace, text, endSpace){
            startSpace = startSpace ? ' ' : '';
            endSpace = endSpace ? ' ' : '';
            return startSpace + d + text.replace(/<br ?\/?>\s*/gi, d + "\n" + d) + d + endSpace;
          });
        }