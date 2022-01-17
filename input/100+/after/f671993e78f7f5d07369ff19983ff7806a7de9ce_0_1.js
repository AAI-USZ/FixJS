function (dict, kbtype) {
        if (dict === null || dict === undefined) {
            dict = ipa_full;
            kbtype = 0;
        }
        if (kbtype === null) {
            kbtype = 0;
        }
        var location, type, lset, lettr, sectn, lst, let, indx, title1, title2, posel, kgp, tmp, helpIcon, kbtoolbarbuttons;
        this.html = document.createElement('div');
        this.html.setAttribute('class', 'kb-wrapper');
        this.html.tabIndex = 1;
	leftResize = document.createElement('span');
	leftResize.setAttribute('class', 'kb-left-resize');
	rightResize = document.createElement('span');
	rightResize.setAttribute('class', 'kb-right-resize');
	bottomResize = document.createElement('span');
	bottomResize.setAttribute('class', 'kb-bottom-resize');
	topResize = document.createElement('span');
	topResize.setAttribute('class', 'kb-top-resize');
	this.html.appendChild(leftResize);
	this.html.appendChild(rightResize);
	this.html.appendChild(bottomResize);
	this.html.appendChild(topResize);
        kbtoolbar = document.createElement('div');
        kbtoolbar.setAttribute('class', 'kb-topbar');
        kbtoolbar.innerHTML = 'VIPAK&nbsp;';
        closeIcon = document.createElement('i');
        closeIcon.setAttribute('class', 'kbclose');
        closeIcon.setAttribute('title', 'close VIPAK');
        closeIcon.innerHTML = '&times;';
        helpIcon = document.createElement('i');
        helpIcon.setAttribute('class', 'kbhelp');
        helpIcon.setAttribute('title', 'about VIPAK~\n Hotkeys - (focused in text box)\n  Activate: Ctrl+Shift\n  Deactivate: Esc');
        helpIcon.innerHTML = '?';
        kbtoolbarbuttons = document.createElement('span');
        kbtoolbarbuttons.setAttribute('class', 'kb-toolbar-right');
        kbtoolbarbuttons.appendChild(helpIcon);
        kbtoolbarbuttons.appendChild(closeIcon);
        kbtoolbar.appendChild(kbtoolbarbuttons);
        this.html.appendChild(kbtoolbar);
        if (kbtype === 0) {
            for (location in dict) {
                posel = document.createElement('span');
                posel.setAttribute('class', 'kb-' + (location === '0' ? 'center' : (location === '1' ? 'left' : 'right')));
                for (type in dict[location]) {
                    createKeySection(type);
                    for (indx in dict[location][type]) {
                        for (lset in dict[location][type][indx]) {
                            createLetterSet(dict[location][type][indx][lset]);
                        }
                        if (location === "0") {
                            this.Center.push(sectn);
                        }
                        if (location === "1") {
                            this.Left.push(sectn);
                        }
                        if (location === "2") {
                            this.Right.push(sectn);
                        }
                        posel.appendChild(sectn.elmnt);
                    }
                }
                this.html.appendChild(posel);
		if(location === "0"){this.position.center = posel;}
                if(location === "1"){
		  this.position.left = posel;
		  middleResize = document.createElement('span');
		  middleResize.setAttribute('class', 'kb-mid-resize');
		  this.html.appendChild(middleResize);
		}
                if(location === "2"){this.position.right = posel;}
            }
        }
        if (kbtype === 1) {
            createKeySection();
            for (lset in dict) {
                createLetterSet(dict[lset]);
            }
            this.html.appendChild(sectn.elmnt);
        }
        if (kbtype === 2) {
            lset = "~";
            createKeySection('');
            createLetterSet(dict);
            this.html.appendChild(sectn.elmnt);
        }

        function createKeySection(typ) {
            sectn = new KeySection();
            sectn.title = typ;
            sectn.elmnt = document.createElement('div');
            sectn.elmnt.setAttribute('class', 'kb-section');
            if (typ !== null) {
                title1 = document.createElement('div');
                title1.setAttribute('class', 'kb-area-title');
                title1.innerHTML = sectn.title;
                sectn.elmnt.appendChild(title1);
            }
        }

        function createLetterSet(dictref) {
            lst = new LetterSet();
            lst.title = lset;
            lst.elmnt = document.createElement('span');
            lst.elmnt.setAttribute('class', 'kb-letter-set');
            lst.elmnt.setAttribute('id', lst.title);
            title2 = document.createElement('span');
            title2.setAttribute('class', 'kb-letter-set-title');
            title2.innerHTML = lst.title;
            lst.elmnt.appendChild(title2);
            kgp = document.createElement('span');
            kgp.setAttribute('class', 'kb-btn-group');
            for (lettr in dictref) {
                let = new Letter();
                let.letter = lettr;
                let.isScript = checkCharWidth(lettr);
                let.title = dictref[lettr] !== undefined ? dictref[lettr] : '';
                let.elmnt = document.createElement('button');
                let.elmnt.setAttribute('class', 'kb-letter');
                let.elmnt.setAttribute('id', 'kbl' + let.letter);
                let.elmnt.setAttribute('title', let.title);
                let.elmnt.setAttribute('letter', let.letter);
                let.elmnt.innerHTML = (let.isScript ? '&nbsp;' : '') + let.letter;
                lst.letterset.push(let);
                kgp.appendChild(let.elmnt);
            }
            lst.elmnt.appendChild(kgp);
            kb.alphaSet[lst.title] = lst.letterset;
            sectn.keyset.push(lst);
            sectn.elmnt.appendChild(lst.elmnt);
        }
    }