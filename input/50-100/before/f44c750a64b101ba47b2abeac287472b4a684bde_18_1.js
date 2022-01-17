function(win)

  {

    return (

    ['li',

      win ?

      ['pre',

        'window id: ' + win.window_id + '\n' +

        'title: ' + win.title + '\n'+

        'window type: ' + win.window_type + '\n' +

        'opener id: ' + win.opener_id

      ]:

      []

    ]);

  }