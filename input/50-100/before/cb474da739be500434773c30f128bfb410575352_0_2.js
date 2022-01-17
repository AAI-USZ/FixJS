function(w,h,c) {

     top.cr=window.open('',

      'gitHtml',

      'width='+w+',height='+h+','+

       'menubar=,'+

       'toolbar=1,'+

       'status=,'+

       'scrollbars=1,'+

       'resizable=1'

      )

     top.cr.document.writeln(c);

     top.cr.document.close();

    }