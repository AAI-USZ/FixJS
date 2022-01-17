function Keyboard() {
    var kb = this, sectn,
        typeModeIcon, isVisible = false,
        isDragging = false,
        closeIcon, isDragged, leftResize, rightResize, bottomResize, topResize, middleResize,
	resizingL, resizingR, resizingB, resizingT, resizingM, draggingBar;
    var alpha, beta, charlie, delta, foxtrot, gamma, hotel = 1,
        specialMode = false,
        prevMode = false,
        kbtoolbar,
        _specialCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            SHIFT: 16,
            TAB: 9,
            UP: 38
        };
    var _startX = 0, _startY = 0; // mouse starting positions
    var _offsetX = 0, _offsetY = 0; // current element offset
    var _lastX = 0, _lastY = 0;
    var _oldZIndex = 0; // we temporarily increase the z-index during drag
    typeModeIcon = document.createElement('canvas');
    typeModeIcon.setAttribute('class', 'kbtyping');
    typeModeIcon.setAttribute('width', '24');
    typeModeIcon.setAttribute('height', '24');
    drawHoshi(typeModeIcon.getContext('2d'));
    this.Center = [];
    this.position = {
      left: null,
      right: null,
      center: null,
      column: []
    };
    this.colWrapper = null;
    this.parentId = null;
    this.focusBox = null;
    this.alphaSet = [];
    this.focusbox = null;
    this.driver = function (dict, kbtype, boxSelector) {

        this.organize(dict, kbtype);
        document.body.appendChild(this.html);
        $(this.html).hide();
        this.setBoxListener(boxSelector);
        this.setButtonListeners();
        this.setHotKeys();
        document.onmousedown = this.OnMouseDown;
        document.onmouseup = this.OnMouseUp;
    };
    this.organize = function (dict, kbtype) {
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
	this.colWrapper = document.createElement('div');
	this.colWrapper.setAttribute('class', 'kb-col-wrapper');
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
                        posel.appendChild(sectn.elmnt);
                    }
                }
                
		if(location === "0"){
		  this.position.center = posel;
		  this.html.appendChild(posel);
		}else{
		  this.colWrapper.appendChild(posel);
		}
                if(location === "1"){
		  this.position.left = posel;
		  middleResize = document.createElement('span');
		  middleResize.setAttribute('class', 'kb-mid-resize');
		  this.colWrapper.appendChild(middleResize);
		}
                if(location === "2"){this.position.right = posel;}
                if(Number(location) > 2){this.position.column.push(posel);}
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
        this.html.appendChild(this.colWrapper);
    };
    this.writeToBox = function (chr, replaceLength) {
        var cStart, cEnd, str, output;
        cStart = $(this.focusBox).caret().start - replaceLength;
        cEnd = $(this.focusBox).caret().end;
        str = $(this.focusBox).attr('value');
        out = str.substring(0, cStart) + chr + str.substring(cEnd);
        $(this.focusBox).attr('value', out);
        cStart = cEnd + chr.length;
        $(this.focusBox).caret(cStart, cStart);
    };
    this.setHotKeys = function () {
        document.onkeydown = function (e) {
            if (e === null) e = window.event;
            var target = e.target !== null ? e.target : e.srcElement;
            if (target === kb.html) {
                if (e.keyCode === _specialCode['ESCAPE']) {
                    $('.kbclose').trigger('click');
                }
            }
            if (target === kb.focusBox) {
                if (e.keyCode === 17 && specialMode) {

                    delta = null;
                    foxtrot = 0;
                    hotel = 0;
                }
                if (e.keyCode === _specialCode['ESCAPE']) {
                    specialMode = false;
                    delta = null;
                    foxtrot = 0;
                    hotel = 0;
                    $(typeModeIcon).remove();
                }
                if (e.ctrlKey && e.keyCode === _specialCode['SHIFT']) {
                    specialMode = true;
                    delta = null;
                    foxtrot = 0;
                    hotel = 0;
                    $(kb.focusBox).after(typeModeIcon);
                }
                if (e.ctrlKey && e.keyCode === _specialCode['ESCAPE']) {
                    $('.kbclose').trigger('click');
                }
            }
        }
        document.onkeypress = function (e) {
            if (e === null) e = window.event;
            var target = e.target !== null ? e.target : e.srcElement;
            if (target === kb.focusBox) {
                if (specialMode && e.which !== 17 && e.which !== 16 && !e.ctrlKey) {
                    alpha = String.fromCharCode(e.charCode).toLocaleUpperCase();
                    foxtrot = alpha === delta ? foxtrot + 1 : 0;
                    if (foxtrot === 0) {
                        hotel = 0;
                    }
                    delta = alpha;
                    beta = kb.alphaSet[alpha];
                    if (beta !== undefined) {
                        gamma = beta[foxtrot % beta.length].letter;
                        e.preventDefault();
                        kb.writeToBox(gamma, hotel);
                        hotel = gamma.length;
                    }
                }
            }
        };
    };
    this.setButtonListeners = function () {
        $(this.html).find('.kb-letter').click(function () {
            cS = $(kb.focusBox).caret().start, cE = $(kb.focusBox).caret().end;
            str = $(kb.focusBox).attr('value');
            sub1 = str.substring(0, cS);
            sub2 = str.substring(cE);
            $(kb.focusBox).attr('value', sub1 + $(this).attr('letter') + sub2);
            $(kb.focusBox).focus();
            cS = cS + $(this).attr('letter').length;
            cE = cS;
            $(kb.focusBox).caret(cS, cS);
        });
    };
    this.setBoxListener = function (cls) {
        var ctx = (cls === null || cls.length === 0) ? $('textarea, input[type=text],input[type=textbox]') : $(cls);

        $(((cls === null || cls.length === 0) ? 'textarea, input[type=text],input[type=textbox]' : cls)).focusin(function () {
            if (kb.focusBox !== this || !isVisible) {
                $(kb.html).slideDown(300, function () {
                    if (!isDragged) $(this).bottomCenter();
                    if(middleResize !== undefined){
		      middleResize.style.left = kb.position.left.offsetWidth+'px';
		      kb.resizeHeight();
		    }
                    
                });
                kb.focusBox = this;
                hotel = 1;
                specialMode = false;
                prevMode = false;
                $(typeModeIcon).remove();
                isVisible = true;
            }
        });

        $('.kbclose').click(function () {
            kb.focusBox = null;
            $(kb.html).slideUp(300);
            isVisible = false;
        });

        $(window).resize(function () {
            $(kb.html).bottomCenter();
	    if(middleResize !== undefined){middleResize.style.left = kb.position.left.offsetWidth+'px';}
        });
    };
    this.OnMouseDown = function (e) {
        var height = kb.html.offsetHeight-4;
        if (e === null) {
            e = window.event;
        }
        kb.html.style.width = kb.html.offsetWidth-4+'px';
        resizingL=e.target===leftResize;
        resizingR=e.target===rightResize;
        resizingB=e.target===bottomResize;
        resizingT=e.target===topResize;
        resizingM=e.target===middleResize;
	draggingBar = e.target===kbtoolbar;
        var target = e.target !== null ? e.target : e.srcElement;
        if ((e.button === 1 && window.event !== null || e.button === 0) && (draggingBar||resizingL||resizingR||resizingB||resizingT||resizingM)) {
            _startX = e.clientX;
            _startY = e.clientY;
            _offsetX = extractNumber(kb.html.style.left);
            _offsetY = extractNumber(kb.html.style.top);
	    _lastX = e.clientX;
	    _lastY = e.clientY;
            _oldZIndex = kb.html.style.zIndex;
	    if(draggingBar){
	      kb.html.style.height = height + 'px';
	      document.onmousemove =kb.OnMouseMove;
	    }
	    else{
	      document.onmousemove =kb.Resize;
	    }
            kb.html.style.zIndex = 10000;
            isDragging = true;
            document.body.focus();
            document.onselectstart = function () {
                return false;
            };
            target.ondragstart = function () {
                return false;
            };
            return false;
        }
    };
    this.Resize = function(e){
      if (e === null) var e = window.event;
      var resizeX =_lastX - e.clientX;
      var resizeY = _lastY - e.clientY;
      var curHeight = kb.html.offsetHeight - 4;
      var curWidth = kb.html.offsetWidth-4;
      var leftWidth = kb.position.left? kb.position.left.offsetWidth-2:null;
      if(resizingL){
	kb.html.style.left = (_offsetX + e.clientX - _startX) + 'px';
	kb.html.style.width = curWidth + resizeX + 'px';
	kb.resizeHeight();
      }
      if(resizingR){
	kb.html.style.width = curWidth - resizeX + 'px';
	kb.resizeHeight();
      }
      if(resizingB){
	kb.html.style.height = curHeight - resizeY + 'px';
      }
      if(resizingT){
	kb.html.style.top = (_offsetY + e.clientY - _startY) + 'px';
	kb.html.style.height = curHeight + resizeY + 'px';
      }
      if(resizingM){
	kb.position.left.style.width = leftWidth - resizeX + 'px';
	if(kb.position.right){
	  kb.position.right.style.width = curWidth - (leftWidth-resizeX)+'px';
	}
	kb.resizeHeight();
      }
      if(middleResize !== undefined){
	middleResize.style.left = kb.position.left.offsetWidth+'px';
      }
      _lastX = e.clientX;
      _lastY = e.clientY;
    };
    this.OnMouseMove = function (e) {
      if (e === null) var e = window.event;
      kb.html.style.left = (_offsetX + e.clientX - _startX) + 'px';
      kb.html.style.top = (_offsetY + e.clientY - _startY) + 'px';
      if(middleResize !== undefined){
	middleResize.style.left = kb.position.left.offsetWidth+'px';
      }
    };
    this.OnMouseUp = function (e) {
        if (isDragging) {
	  resizingL=false;
	  resizingR=false
	  resizingB=false;
	  resizingT=false;
	  resizingM=false;
	  if(!draggingBar){
	    kb.resizeHeight();
	  }
	  kb.html.style.zIndex = _oldZIndex;
	  kb.html.focus();
	  document.onmousemove = null;
	  document.onselectstart = null;
	  isDragging = false;
	  isDragged = true;
        }
    };
    this.resizeHeight = function(){
      var tb = kbtoolbar.offsetHeight;
      var lh = this.position.left?this.position.left.offsetHeight:0;
      var rh = this.position.left?this.position.right.offsetHeight:0;
      var ch = this.position.center? this.position.center.offsetHeight:0;
      var sh = !lh && !rh?$('.kb-wrapper > .kb-section').outerHeight():0;
      this.colWrapper.style.height = (lh>rh?lh:rh) + 'px';
      console.log(this.html.offsetHeight + ':' +(sh+lh+tb) + ' or ' + (sh+rh+tb));
      this.html.style.height = tb + ((lh>rh?lh:rh)+sh+ch)+'px';
    };
}