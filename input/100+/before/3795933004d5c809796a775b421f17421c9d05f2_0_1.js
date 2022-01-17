function(c,d) {

      if(!d.getElementById('iframe')){

        var ifr                = d.createElement('iframe');

            ifr.src            = 'about:blank';

            ifr.style.width    = '100%';

            ifr.style.height   = '100%';

            ifr.style.position = 'absolute';

            ifr.style.top      = '0px';

            ifr.style.zIndex   = '9999';

            ifr.id             = 'iframe';

        d.body.appendChild(ifr);

        d.body.style.padding   = '0px';

        d.body.style.margin    = '0px';

      }

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