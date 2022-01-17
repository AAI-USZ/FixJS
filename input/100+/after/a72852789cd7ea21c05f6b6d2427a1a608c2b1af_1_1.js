function() {
          var data = {blurgh: 'fizzzz', partials: {first: 'a ${what}'}, what: 'partial'};
          var rendered = this.context.tmpl('<div class="test_class">{{tmpl "first"}} ${blurgh}</div>', data);
          sameHTML(rendered, '<div class="test_class">a partial fizzzz</div>');
        }