function() {

    test('tpl vs format', function() {
      var tpl = 'My name is {first} {last}, Thats Mr {last}';
      var template;

      var expected = 'My name is Sahaja Lal, Thats Mr Lal';

      var results = support.vs(5000, {
        compiled: function() {
          template = template || new Template(tpl);
          template.render({first: 'Sahaja', last: 'Lal'});
        },

        format: function() {
          Calendar.format(tpl, 'Sahaja', 'Lal');
        }
      });

      assert.ok(
        (results.compiled <= results.format),
        'compiled template should be faster then format'
      );
    });

    test('createElement vs template', function() {
      var container = document.createElement('div'),
          tpl;

      container.id = 'containerTest';
      document.body.appendChild(container);

      var div = document.createElement('div'),
          span = document.createElement('span');

      div.appendChild(span);

      var results = support.vs(5000, {
        html: function() {
          var myDiv = div.cloneNode(),
              mySpan = myDiv.querySelector('span');

          myDiv.className = 'dynamic';
          mySpan.textContent = 'content';
          mySpan.className = 'foo';

          container.innerHTML = '';
          container.appendChild(myDiv);
        },

        template: function() {
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
      });

      container.parentNode.removeChild(container);
    });

  }