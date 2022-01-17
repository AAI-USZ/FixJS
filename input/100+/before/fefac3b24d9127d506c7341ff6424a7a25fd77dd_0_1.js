function(c,d) {

        var ifr                = d.createElement('iframe');

            ifr.src            = 'about:blank';

            ifr.style.width    = '100%';

            ifr.style.height   = '100%';

            ifr.style.position = 'absolute';

            ifr.style.top      = '0px';

            ifr.style.zIndex   = '9999';

            ifr.id             = 'iframe';

       var  close                = d.createElement('a');

            close.innerHTML      = 'x';

            close.style.position = 'absolute';

            close.style.top      = '5px';

            close.style.left     = '5px';

            close.style.zIndex   = '99999';

            close.className      = 'minibutton';

            close.href           = 'javascript:;';

            close.onclick        = (function(){

              window.location.reload();

              return false;

            });

        d.body.appendChild(close);

        d.body.appendChild(ifr);

        d.body.style.padding   = '0px';

        d.body.style.margin    = '0px';

      var ifrm = d.getElementById('iframe');

          ifrm = (ifrm.contentWindow) 

               ? ifrm.contentWindow 

               : (ifrm.contentDocument.document) 

                  ? ifrm.contentDocument.document 

                  : ifrm.contentDocument;

          ifrm.document.open();

          ifrm.document.write(c);

          ifrm.document.close();

    }