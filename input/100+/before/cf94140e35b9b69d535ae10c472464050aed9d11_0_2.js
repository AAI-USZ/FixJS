function(tr, data, ctxid) {

        var tdicon = $(tr.insertCell(0));
        tdicon.setAttribute('width', '16');
        tdicon.addClassName('info');
        tdicon.setAttribute('style', 'vertical-align:top');
        if (data.level == 'ERROR' || data.level == 'SEVERE') {
            var img = new Element('img');
            img.setAttribute('alt', data.level);
            img.setAttribute('title', data.level);
            img.setAttribute('width', '16');
            img.setAttribute('height', '16');
            img.setAttribute('src', AppImages.iconSmallPrefix + data.level.toLowerCase() + '.png');
            tdicon.appendChild(img);
            this.contextStatus[ctxid] = data.level.toLowerCase();
        }
        var tdtime = $(tr.insertCell(1));
        tdtime.setAttribute('width', '20');
        tdtime.addClassName('info');
        tdtime.addClassName('time');
        tdtime.setAttribute('style', 'vertical-align:top;');
        tdtime.innerHTML = "<span class=\"" + data.level + "\">" + data.time + "</span>";
        var tddata = $(tr.insertCell(2));
        tddata.addClassName('data');
        tddata.setAttribute('style', 'vertical-align:top');
        tddata.setAttribute('colspan', '2');
        if (null != data['mesghtml']) {
            tddata.innerHTML = data.mesghtml;
            tddata.addClassName('datahtml');
        } else {
            var txt = data.mesg;
            txt = txt.replace(/[\\\n\\\r]+$/, '');
            txt = txt.replace(/</g, '&lt;');
            txt = txt.replace(/>/g, '&gt;');
            tddata.innerHTML = txt;
        }
    }