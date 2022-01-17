function() {
          tpl = tpl || new Template(
            '<div class="{divClass}">' +
              '<span class="{spanClass}">{content}</span>' +
            '</div>'
          );
          container.innerHTML = '';
          container.innerHTML = tpl.render({
            divClass: 'dynamic',
            spanClass: 'foo',
            content: 'content'
          });
        }