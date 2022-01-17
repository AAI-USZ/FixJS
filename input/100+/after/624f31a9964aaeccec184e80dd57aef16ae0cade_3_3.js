function(editor, callback) {
      var html = editor.htmlDiv.html();

      /**
       * Fetch the regexps for the given tags and call the given
       * callback
       *
       * TODO get rid of the tags parameter?
       */
      function eachRegexp(tags, callback){
        var i, item,
        items = {
          b: [/(\s*)<(?:b|strong)>((?:.|[\r\n])*?)<\/(?:b|strong)>(\s*)/gi,'*'],
          i: [ /(\s*)<(?:i|em)>((?:.|[\r\n])*?)<\/(?:i|em)>(\s*)/gi, '_'],
          del: [ /(\s*)<(?:strike|del)>((?:.|[\r\n])*?)<\/(?:strike|del)>(\s*)/gi, '-'],
          u: [ /(\s*)<(?:u|ins)>((?:.|[\r\n])*?)<\/(?:u|ins)>(\s*)/gi, '+']
        };
        for(i = tags.length; i; i--){
          item = items[tags[i-1]];
          callback(item[0], item[1]);
        }
      }

      html = html.replace(/\s*<(ul|ol)>((.|[\r\n])*?)<\/\1>\s*/gi, function(match, tag, items){
        var bullet = tag == 'ul' ? '*' : '#';
        
        eachRegexp(['b','i', 'u', 'del'], function(regexp, delimiter){
          items = items.replace(regexp, function(match, startSpace, text, endSpace){
            startSpace = startSpace ? ' ' : '';
            endSpace = endSpace ? ' ' : '';
            return startSpace + delimiter + text + delimiter + endSpace;
          });
        });

        return items.replace(/\s*<li>((.|[\r\n])*?)<\/li>\s*/gi, bullet + " $1\n") + "\n";
      });
      
      html = html.replace(/ *<(p|h[1-4])([^>]*)>((.|[\r\n])*?)<\/\1>\s*/gi, function(match, tag, attributes, content){
        var front = "", cssClass = attributes.match(/class=\"([^"]*)/);
        if(cssClass){
          front = tag + "(" + cssClass[1] + "). ";
        } else if(tag != "p"){
          front = tag + ". ";
        }
        eachRegexp(['b','i', 'u', 'del'], function(regexp, d){
          content = content.replace(regexp, function(match, startSpace, text, endSpace){
            startSpace = startSpace ? ' ' : '';
            endSpace = endSpace ? ' ' : '';
            return startSpace + d + text.replace(/<br ?\/?>\s*/gi, d + "\n" + d) + d + endSpace;
          });
        });
        
        return front + content.replace(/<br ?\/?>\s*/gi, "\n") + "\n\n";
      });
      
      html = html.replace(/\s*<img[^>]*>\s*/gi, function(match){
        var img = $(match),
        replacement = img.attr('src'),
        title = img.attr('title');

        if(title && !/^\s*$/.test(title)){
          replacement = replacement + "(" + title + ")";
        }
        return "!" + replacement + "!";
      });
      html = html.replace(/(\s*)<a href="([^\"]*)">((?:.|[\r\n])*?)<\/a>(\s*)/gi, function(match, startSpace, uri, content, endSpace){
        var out = startSpace ? ' ' : '';

        if(/^\s*![^!]+!\s*$/.test(content)){
          out += $.trim(content) + ":";
        } else {
          out += "\"" + content + "\":";
        }
        out += uri;
        if(endSpace){
          out += ' ';
        }
        return out;
      });
      html = html.replace(/\s*<code[^>]*>((.|[\r\n])*?)<\/code>\s*/gi, ' @$1@ ');
      html = html.replace(/(\r\n|\n){3,}/g, "\n\n");
      html = html.replace(/&nbsp;/g, ' ');
      html = html.replace(/^[\r\n]+|[\r\n]+$/g, '');

      return html;
    }