function(match, tag, attributes, content){
        var front = "", cssClass = attributes.match(/class=\"([^"]*)/);
        if(cssClass){
          front = tag + "(" + cssClass[1] + "). ";
        } else if(tag != "p"){
          front = tag + ". ";
        }

        eachRegexp(['b','i', 'u', 'del'], function(regexp, d){
          content = content.replace(regexp, function(match, text){
            return d + text.replace(/<br ?\/?>\s*/gi, d + "\n" + d) + d;
          });
        });
        
        return front + content.replace(/<br ?\/?>\s*/gi, "\n") + "\n\n";
      }