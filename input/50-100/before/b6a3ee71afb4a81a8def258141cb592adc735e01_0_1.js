function () {
        var permalink = H.generate_permalink($page);
        $share_button.attr(
          'href',
          [
            'https://twitter.com/intent/tweet',
            '?url=', encodeURIComponent(permalink),
            '&text=', encodeURIComponent('ハトクラなう。今回のサプライ:'),
            '&related=', encodeURIComponent('HeartofCrown,kana1')
          ].join('')
        );
      }