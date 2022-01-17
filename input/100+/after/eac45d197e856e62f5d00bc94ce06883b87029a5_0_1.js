function tagReplacement(text) {

      // Historical note: At one time we kept lot of stuff intact: <b>, <i>, 
      // <font>, <span>-with-style-attr, <h1>, and so on. This was nice, because
      // it let users do some rich-edit-control formatting that would be retained
      // when rendering.
      // But it was a pain to get/keep working properly in Yahoo mail, and it 
      // introduced issue #18. So I tore out the feature, and now we 
      // only keep a few probably-not-problematic tags. 

      // The default behaviour for `htmlToText` is to strip out tags (and their
      // inner text/html) that it doesn't expect/want. But we want some tag blocks
      // to remain intact.
      text = excludeTagBlocks('blockquote', text, true);

      // Try to leave intact the line that Gmail adds that says:
      //   On such-a-date, such-a-person <email addy> wrote:
      text = text.replace(
                    /&lt;<a (href="mailto:[^>]+)>([^<]*)<\/a>&gt;/ig, 
                    '&lt;&lt;a $1&gt;$2&lt;\/a&gt;&gt;');

      // It's a deviation from Markdown, but we'd like to leave any rendered
      // images already in the email intact. So we'll escape their tags.
      // Note that we can't use excludeTagBlocks because there's no closing tag.
      text = text.replace(/<(img[^>]*)>/ig, '&lt;$1&gt;');

      // Leave some rendered elements intact.
      keepTags = ['a'];
      for (i = 0; i < keepTags.length; i++) {
        text = excludeTagBlocks(keepTags[i], text, false);
      }

      // Experimentation has shown some tags that need to be tweaked a little.
      text =
        text
          .replace(/<div[^>]*>/ig, '<br>') // opening <div> --> <br>
          .replace(/<\/div>/ig, '')        // closing </div> --> nothing
          .replace(/<(img[^>]*)>/ig, '&lt;$1&gt;') // <img> tags --> textual <img> tags
          .replace(/&nbsp;/ig, ' ');       // &nbsp; --> space

      return text;

      // Escape all tags between tags of type `tagName`, inclusive. Also add a
      // special "exclude" class to them.
      // If `wrapInPara` is true, `<p>` tags will be added before and after each
      // tag block found.
      // If `ifHasAttribute` is non-null, tags will only be matched if they have
      // that attribute.
      // If `ifNotHasString` is non-null, tags that contain that string will not
      // be matched. Note that `ifNotHasString` will be used in a regex.
      function excludeTagBlocks(tagName, text, wrapInPara, ifHasAttribute, ifNotHasString) {
        var depth, startIndex, openIndex, closeIndex, currentOpenIndex, 
          openTagRegex, closeTagRegex, remainderText, closeTagLength, regexFiller;

        regexFiller = ifNotHasString ? '(((?!'+ifNotHasString+')[^>])*)' : '[^>]*'
        if (ifHasAttribute) {
          openTagRegex = new RegExp('<'+tagName+'\\b'+regexFiller+'\\b'+ifHasAttribute+'\\b'+regexFiller+'>', 'i');
        }
        else {
          openTagRegex = new RegExp('<'+tagName+'\\b'+regexFiller+'>', 'i');
        }

        closeTagRegex = new RegExp('</'+tagName+'\\b', 'i');

        depth = 0;
        startIndex = 0;

        while (true) {
          remainderText = text.slice(startIndex); 

          openIndex = remainderText.search(openTagRegex);
          closeIndex = remainderText.search(closeTagRegex);

          if (openIndex < 0 && closeIndex < 0) {
            break;
          }

          if (closeIndex < 0 || (openIndex >= 0 && openIndex < closeIndex)) { 
            // Process an open tag next.

            // Make the index relative to the beginning of the string.
            openIndex += startIndex;

            if (depth === 0) {
              // Not a nested tag. Start the escape here.
              currentOpenIndex = openIndex;
            }

            startIndex = openIndex + 1;
            depth += 1;
          }
          else { 
            // Process a close tag next.

            if (depth > 0) {
              // Make the index relative to the beginning of the string.
              closeIndex += startIndex;

              if (depth === 1) {
                // Not a nested tag. Time to escape.
                // Because we've mangled the opening and closing tags, we need to
                // put around them so that they don't get mashed together with the 
                // preceeding and following Markdown.
                
                closeTagLength = ('</'+tagName+'>').length;

                text = 
                  text.slice(0, currentOpenIndex)
                  + (wrapInPara ? '<p/>' : '')
                  + addClassToAllTags('markdown-here-exclude', text.slice(currentOpenIndex, closeIndex+closeTagLength))
                        .replace(/</ig, '&lt;')
                  + (wrapInPara ? '<p/>' : '')
                  + text.slice(closeIndex+closeTagLength);

                // Start from the beginning again. The length of the string has 
                // changed (so our indexes are meaningless), and we'll only find
                // unescaped/unprocessed tags of interest anyway.
                startIndex = 0;
              }
              else {
                startIndex = closeIndex + 1;
              }
              
              depth -= 1;
            }
            else {
              // Depth is 0. So we've found a closing tag while not in an opening
              // tag -- this can happen normally if `ifHasAttribute` is non-null.
              // Just advance the startIndex.
              startIndex += closeIndex + 1;
            }
          }
        }

        return text;
      }

      // Add the class `className` to all tags in `text`.
      function addClassToAllTags(className, text) {
        return text
          .replace(
            /<(\w+\b)(([^>]*)(class=("|')([^>]*?)\5)([^>]*))>/ig, 
            '<$1$3class="$6 ' + className + '"$7>')
          .replace(
            /<(\w+\b)(((?!class)[^>])*)>/ig, 
            '<$1 class="' + className + '"$2>');
      }
    }