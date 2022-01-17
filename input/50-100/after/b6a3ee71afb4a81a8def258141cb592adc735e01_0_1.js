function (e) {
        // iPhone Safari seems not to trigger a click event for <a> if the
        // element has a href attribute.  So that we have to explicitly open
        // a new window instead of to set a permalink to the href attribute and
        // to let the Web browser open the permalink.
        var permalink = H.generate_permalink($page);
        window.open(
          [
            'https://twitter.com/intent/tweet',
            '?url=', encodeURIComponent(permalink),
            '&text=', encodeURIComponent('ハトクラなう。今回のサプライ:'),
            '&related=', encodeURIComponent('HeartofCrown,kana1')
          ].join('')
        );
        e.preventDefault();
      }