function () {
        var line_beginning, tag, classes, ids, attribs, content, whitespaceSpecifier, whitespace={}, output;
        line_beginning = this.matches[2];
        classes = line_beginning.match(/\.([a-z_\-][a-z0-9_\-]*)/gi);
        ids = line_beginning.match(/\#([a-z_\-][a-z0-9_\-]*)/gi);
        tag = line_beginning.match(/\%([a-z_\-][a-z0-9_:\-]*)/gi);

        // Default to <div> tag
        tag = tag ? tag[0].substr(1, tag[0].length) : 'div';

        attribs = this.matches[3];
        if (attribs) {
          attribs = parse_attribs(attribs);
          if (attribs._content) {
            var leader0 = attribs._content.charAt(0),
                leader1 = attribs._content.charAt(1),
                leaderLength = 0;
                
            if(leader0 == "<"){
              leaderLength++;
              whitespace.inside = true;
              if(leader1 == ">"){
                leaderLength++;
                whitespace.around = true;
              }
            }else if(leader0 == ">"){
              leaderLength++;
              whitespace.around = true;
              if(leader1 == "<"){
                leaderLength++;
                whitespace.inside = true;
              }
            }
            attribs._content = attribs._content.substr(leaderLength);
            //once we've identified the tag and its attributes, the rest is content.
            // this is currently trimmed for neatness.
            this.contents.unshift(attribs._content.trim());
            delete(attribs._content);
          }
        } else {
          attribs = {};
        }

        if (classes) {
          classes = classes.map(function (klass) {
            return klass.substr(1, klass.length);
          }).join(' ');
          if (attribs['class']) {
            try {
              attribs['class'] = JSON.stringify(classes + " " + JSON.parse(attribs['class']));
            } catch (e) {
              attribs['class'] = JSON.stringify(classes + " ") + " + " + attribs['class'];
            }
          } else {
            attribs['class'] = JSON.stringify(classes);
          }
        }
        if (ids) {
          ids = ids.map(function (id) {
            return id.substr(1, id.length);
          }).join(' ');
          if (attribs.id) {
            attribs.id = JSON.stringify(ids + " ") + attribs.id;
          } else {
            attribs.id = JSON.stringify(ids);
          }
        }

        attribs = render_attribs(attribs);

        content = this.render_contents();
        if (content === '""') {
          content = '';
        }
        
        if(whitespace.inside){
          if(content.length==0){
            content='"  "'
          }else{
            try{ //remove quotes if they are there
              content = '" '+JSON.parse(content)+' "';
            }catch(e){
              content = '" "+\n'+content+'+\n" "';
            }            
          }
        }

        if (forceXML ? content.length > 0 : self_close_tags.indexOf(tag) == -1) {
          output = '"<' + tag + attribs + '>"' +
            (content.length > 0 ? ' + \n' + content : "") +
            ' + \n"</' + tag + '>"';
        } else {
          output = '"<' + tag + attribs + ' />"';
        }
        
        if(whitespace.around){
          //output now contains '"<b>hello</b>"'
          //we need to crack it open to insert whitespace.
          output = '" '+output.substr(1, output.length - 2)+' "';
        }

        return output;
      }