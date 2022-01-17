function(w,h,c) {

     top.consoleRef=window.open('',

      'gitHtml',

      'width='+w+',height='+h+','+

       'menubar=,toolbar=1,status=,'+

       'scrollbars=1,resizable=1'

      )

     top.consoleRef.document.writeln(c);

     top.consoleRef.document.close();

    }