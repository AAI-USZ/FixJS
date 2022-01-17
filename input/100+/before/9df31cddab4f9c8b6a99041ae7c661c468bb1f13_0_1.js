function (btnConfig) {

                var li = document.createElement('li');
                li.className = "action-buffer-container";

                var a = document.createElement('a');
                a.setAttribute('class', btnConfig.className + " with-icn");
                a.setAttribute('href', '#')

                var i = document.createElement('i');
                i.setAttribute('class', 'sm-embed'); // let Twitter set the bg colors
                i.setAttribute('style', 'position: relative; top: 0px; margin-right: 4px; width: 13px; height: 13px; background-image: url(' + xt.data.get('data/shared/img/twttr-sprite-small.png') + ')!important; background-repeat: no-repeat;');

                $(a).append(i);

                var b = document.createElement('b');
                $(b).text(btnConfig.text);

                $(a).append(b);

                $(li).append(a);

                return li;


            }