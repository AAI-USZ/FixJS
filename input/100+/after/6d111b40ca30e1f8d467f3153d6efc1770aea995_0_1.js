function (i) {
        try {
          dom.innerHTML = content[i].content;
        } catch (err) {
          smith.log.error('Error while loading content for archive from '+i);
          throw err;
        }

        //Uses the title which is inside the article tag
        //do not confuse with the blog title
        var article = $(".content", dom).html(),
            title = $("article > .title", dom).html(),
            rm = false;

        // As with the article, we've already "rendered" the title (with link),
        // so let's set that here.
        content[i].metadata.title = title;

        if (article) {
          // If the resource has a truthy "preview" property, replace rendered
          // articles with short versions of them, with a link to read more.
          if (content[file].metadata.preview) {
            dom.innerHTML = article;
            [
              'h2'
            ].forEach(function (selector) {
              elem = $(selector, dom);

              // Removes elements after selected element
              elem.nextAll().each(function() {
                $(this).remove();
              });

              // Removes selected element
              elem.remove();
            });

            return {
              content: dom.innerHTML,
              metadata: content[i].metadata,
              readMore: content[i].metadata.link
            };     
          }

          return {
            content: article,
            metadata: content[i].metadata,
            readMore: content[i].metadata.link
          };
        } else {
          return {
            content: null,
            metadata: content[i].metadata,
            readMore: content[i].metadata.link
          };
        }
      }