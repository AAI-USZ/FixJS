function Keyboard(){
  var kb = this, typeModeIcon, isVisible=false;
  var alpha, beta, charlie, delta, foxtrot, gamma, hotel=1, specialMode = false, prevMode = false;
  typeModeIcon = document.createElement('i');
  typeModeIcon.setAttribute('class', 'icon icon-leaf kbtyping');
  this.Left = [];
  this.Right = [];
  this.Center = [];
  this.position = [];
  this.parentId = null;
  this.focusBox = null;
  this.alphaSet = [];
  this.focusbox = null;
  this.fullIPADriver = function(){
    this.organize(this.ipa_full);
    document.body.appendChild(this.html);
    $(this.html).hide();
    this.setBoxListener();
    this.setButtonListeners();
    this.setHotKeys();
  }
  this.organize = function(dict){
    if(dict == null)
    {
      return false;
    }
    var location, type, lset, lettr, sectn, lst, let, indx, counter=0;
    var title1, title2, posel, kgp, tmp, closeIcon, helpIcon;
    this.html = document.createElement('div');
    this.html.setAttribute('class', 'kbwpr');
    closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'kbclose');
    closeIcon.setAttribute('title', 'close VIPAK');
    closeIcon.innerHTML = '&times;';
    helpIcon = document.createElement('i');
    helpIcon.setAttribute('class', 'kbhelp');
    helpIcon.setAttribute('title', 'about VIPAK');
    helpIcon.innerHTML = '?';
    this.html.appendChild(helpIcon);
    this.html.appendChild(closeIcon);
    for(location in dict){
      posel = document.createElement('span');
      posel.setAttribute('id', 'kbpos'+location);
      
      for(type in dict[location]){
	
	sectn = new KeySection();
	sectn.title = type;
	sectn.elmnt = document.createElement('div');
	sectn.elmnt.setAttribute('class', 'kbsection');
	title1 = document.createElement('div');
	title1.setAttribute('class', 'label kbsectitle');
	title1.innerHTML = sectn.title;
	sectn.elmnt.appendChild(title1);
	for(indx in dict[location][type]){
	  for(lset in dict[location][type][indx]){
	    lst = new LetterSet();
	    lst.title = lset;
	    lst.elmnt = document.createElement('span');
	    lst.elmnt.setAttribute('class', 'kblset label');
	    lst.elmnt.setAttribute('id', lst.title);
	    title2 = document.createElement('span');
	    title2.setAttribute('class', 'kblsetitle badge');
	    title2.innerHTML = lst.title;
	    lst.elmnt.appendChild(title2);
	    kgp = document.createElement('span');
	    kgp.setAttribute('class', 'kbtng btn-group');
	    for(lettr in dict[location][type][indx][lset]){
	      let = new Letter();
	      let.letter = lettr;
	      let.isScript = checkCharWidth(lettr);
	      let.title = dict[location][type][indx][lset][lettr];
	      let.elmnt = document.createElement('button');
	      let.elmnt.setAttribute('class', 'kbletter btn');
	      let.elmnt.setAttribute('id', 'kbl'+let.letter);
	      let.elmnt.setAttribute('title', let.title);
	      let.elmnt.setAttribute('letter', let.letter);
	      let.elmnt.innerHTML = (let.isScript? '&nbsp;':'')+let.letter;
	      lst.letterset.push(let);
	      kgp.appendChild(let.elmnt);
	      
	    }
	    counter=counter+1;
	    lst.elmnt.appendChild(kgp);
	    this.alphaSet[lst.title] = lst.letterset;
	    sectn.keyset.push(lst);
	    sectn.elmnt.appendChild(lst.elmnt);
	  }
	  if(location=="0"){
	    this.Left.push(sectn);
	  }
	  if(location=="1"){
	    this.Right.push(sectn);
	  }
	  if(location=="2"){
	    this.Center.push(sectn);
	  }
	  posel.appendChild(sectn.elmnt);
	}
      }
      this.html.appendChild(posel);
      this.position.push(posel);
    }
  };
  this.ipa_full = {
    "0"	:
    {
      "vowels"	:
      [
	{"A" : { "æ":"near-open front unrounded", "ɐ":"near-open central", "ɑ":"open back unrounded", "ɒ":"open back rounded"}},
	{"E" : { "ə":"mid-central (schwa)", "ɚ":"rhotacized mid-central", "ɵ":"close-mid central rounded", "ɘ":"close-mid central unrounded",}},
	{"3" : { "ɜ":"open-mid central unrounded", "ɝ":"rhotacized open-mid central unrounded", "ɛ":"open-mid front unrounded", "ɛ̃":"nasalized open-mid front unrounded", "ɞ":"open-mid central rounded"}},
	{"I" : { "ɨ":"close central unrounded", "ɪ":"near-close near-front unrounded",}},
	{"O" : { "ɔ":"open-mid back rounded", "ɤ":"close-mid back unrounded", "ø":"close-mid front rounded", "œ":"open-mid front rounded", "ɶ":"open front rounded"}},
	{"U" : { "ʌ":"open-mid back unrounded", "ʊ":"near-close near-back rounded", "ʉ":"close central rounded", "ɯ":"close back unrounded"}},
	{"Y" : { "ʏ":"near-close near-front rounded"}}
      ],
      "consonants"	:
      [
	{"B" : { "β":"voiced bilabial fricative", "ʙ":"bilabial trill", "ɓ":"voiced bilabial implosive"}},
	{"C" : { "ɕ":"voiceless alveopalatal fricative", "ç":"voiceless palatal fricative"}},
	{"D" : { "ð":"voiced dental fricative", "d͡ʒ":"voiced postalveolar fricative", "ɖ":"voiced retroflex plosive", "ɗ":"voiced alveolar implosive", "ᶑ":"voiced retroflex implosive"}},
	{"G" : { "ɠ":"voiced velar implosive", "ɢ":"voiced uvular plosive", "ʛ":"voiced uvular implosive"}},
	{"H" : { "ɦ":"voiced glottal fricative", "ħ":"voiceless pharyngeal fricative", "ɧ":"voiceless palatal-velar fricative", "ʜ":"voiceless epiglottal fricative", "ɥ":"labial-palatal approximant"}},
	{"J" : { "ʝ":"voiced palatal fricative", "ɟ":"voiced palatal plosive", "ʄ":"voiced palatal implosive", "ʎ":"palatal lateral approximant"}},
	{"L" : { "ɫ":"velarized alveolar lateral approximant", "ɮ":"voiced alveolar lateral fricative", "ɭ":"retroflex lateral approximant", "ɬ":"voiceless alveolar lateral fricative", "ʟ":"velar lateral approximant"}},
	{"M" : { "ɱ":"labiodental nasal"}},
	{"N" : { "ŋ":"velar nasal", "ɲ":"palatal nasal", "ɴ":"uvular nasal", "ɳ":"retroflex nasal"}},
	{"P" : { "ɸ":"voiceless bilabial fricative"}},
	{"R" : { "ʁ":"voiced uvular fricative", "ʀ":"uvular trill", "ɹ":"alveolar approximant", "ɾ":"alveolar tap", "ɻ":"retroflex approximant", "ɽ":"retroflex flap", "ɺ":"alveolar lateral flap"}},
	{"S" : { "ʃ":"voiceless postalveolar fricative", "ʂ":"voiceless retroflex fricative"}},
	{"T" : { "θ":"voiceless dental fricative", "ʈ":"voiceless retroflex plosive", "t͡ʃ":"voiceless postalveolar fricative", "t͡s":"voiceless alveolar fricative"}},
	{"V" : { "ⱱ":"labiodental flap", "ʋ":"labiodental approximant", "ɣ":"voiced velar fricative"}},
	{"W" : { "ɰ":"velar approximant", "ʍ":"voiceless labio-velar approximant"}},
	{"X" : { "χ":"voiceless uvular fricative"}},
	{"Z" : { "ʒ":"voiced postalveolar fricative", "ʐ":"voiced retroflex fricative", "ʑ":"voiced alveopalatal fricative"}},
	{"?" : { "ʔ":"glottal stop", "ʕ":"voiced pharyngeal fricative", "ʢ":"voiced epiglottal fricative", "ʡ":"epiglottal plosive",}},
	{"0" : { "ʘ":"bilabial click", "ǀ":"dental click", "ǃ":"retroflex click", "ǂ":"postalveolar click", "ǁ":"alveolar lateral click"}}
      ]
    },
    "1"	:
    {
      "diacritics"	:
      [
	{"*" : { "ʰ":"aspirated", "ʷ":"labialized", "ʲ":"palatalized", "ˠ":"velarized", "ˤ":"pharyngealized", "ⁿ":"nasal release", "ˡ":"lateral release", "ʱ":"breathy-voice aspirated", "ᵊ":"syllabic or schwa", "ʳ":"optional r", "˞":"rhotacized"}},
	{"#" : { "̚":"unreleased", "̈":"centralized", "̃":"nasalized", "̥":"voiceless", "̊":"voiceless", "̬":"voiced", "̩":"syllabic", "̝":"raised", "̞":"lowered", "̟":"advanced (fronted)", "̠":"retracted (backed)"}},
	{">" : { "ʼ":"ejective", "̪":"dental", "̺":"apical", "̯":"non-syllabic", "̤":"breathy voiced", "̰":"creaky voiced", "̼":"linguolabial", "̘":"advanced tongue root", "̙":"retracted tongue root", "̻":"laminal", "̹":"more rounded", "̜":"less rounded", "̽":"mid-centralized"}},
	{"~" : { "ː":"length mark", "ˑ":"half-long", "̆":"extra short",}},
	{"\'" : { "ˈ":"primary stress", "ˌ":"secondary stress",}},
	{"|":{ "|":"minor group", "‖":"major group",}},
	{"["	:{ "͡":"tie bar", "͜":"tie bar", "‿":"linking", "→":"becomes"}},
	{"\"" : { "̋":"extra high", "́":"high", "̄":"mid", "̀":"low", "̏":"extra low",}},
	{"^": { "̌":"rising", "̂":"falling", "᷄":"high rising", "᷅":"low rising", "᷈":"rising-falling"}},
	{"]" : {"˥":"extra high", "˦":"high", "˧":"mid", "˨":"low", "˩":"extra low"}}, 
	{"\\" : {"˩˥":"rising (may not work on chrome/safari)", "˥˩":"falling (may not work on chrome/safari)", "˦˥":"high rising (may not work on chrome/safari)", "˩˨":"low rising (may not work on chrome/safari)", "˧˦˧":"rising-falling (may not work on chrome/safari)"}},
	{"+" : { "↓" : "downstep", "↑" : "upstep", "↗" : "global rise", "↘" : "global fall"}}
      ] 
    }
  };
  this.writeToBox = function(chr, replaceLength){
    var cStart, cEnd, str, output;
    cStart = $(this.focusBox).caret().start - replaceLength;
    cEnd = $(this.focusBox).caret().end;
    str = $(this.focusBox).attr('value');
    out = str.substring(0,cStart) + chr + str.substring(cEnd);
    $(this.focusBox).attr('value', out);
    cStart = cEnd + chr.length;
    $(this.focusBox).caret(cStart,cStart);
  };
  this.setHotKeys = function(){
    document.onkeydown = function(e){
      if(e.target == kb.focusBox){
	if(e.which == 17 && specialMode){
	  console.log('newchar');
	  delta = null;
	  foxtrot = 0;
	  hotel = 0;
	}
	if(e.which == specialCode['ESCAPE']){
	  specialMode = false;
	  delta = null;
	  foxtrot = 0;
	  hotel = 0;
	  $(typeModeIcon).remove();
	}
	if(e.ctrlKey && e.which == specialCode['SHIFT']){
	  specialMode=true;
	  delta = null;
	  foxtrot = 0;
	  hotel = 0;
	  $(kb.focusBox).after(typeModeIcon);
	}
      }
    }
    document.onkeypress = function(e){
      if(e.target == kb.focusBox){
	if(specialMode && e.which != 17 && e.which != 16 && !e.ctrlKey){
	  alpha = String.fromCharCode(e.charCode).toLocaleUpperCase();
	  foxtrot = alpha == delta ? foxtrot+1: 0;
	  if(foxtrot==0){
	    hotel=0;
	  }
	  delta = alpha;
	  beta = kb.alphaSet[alpha];
	  if(beta != undefined){
	    gamma = beta[foxtrot % beta.length].letter;
	    e.preventDefault();
	    kb.writeToBox(gamma, hotel);
	    hotel = gamma.length;
	  }
	}
      }
    };
  };
  this.setButtonListeners = function(){
    $(this.html).find('.kbletter').click(function(){
      cS = $(kb.focusBox).caret().start, cE = $(kb.focusBox).caret().end;
      str = $(kb.focusBox).attr('value');
      sub1 = str.substring(0,cS);
      sub2 = str.substring(cE);
      $(kb.focusBox).attr('value', sub1 + $(this).attr('letter') + sub2);
      $(kb.focusBox).focus();
      cS = cS+$(this).attr('letter').length;
      cE = cS;
      $(kb.focusBox).caret(cS,cS);
    });
  };
  this.setBoxListener = function(){
    $('.keyboardEnabled').focusin(function(){
	if(kb.focusBox != this || !isVisible){
	  $(kb.html).slideDown(300).center();
	  kb.focusBox = this;
	  hotel=1;
	  specialMode = false; 
	  prevMode = false;
	  $(typeModeIcon).remove();
	  isVisible = true;
	}
    });
    $('.keyboardEnabled').focusout(function(e){
      console.log(e);
    });
    $('.kbclose').click(function(){
      $(kb.html).slideUp(300);
      isVisible = false;
    });
    $(window).resize(function(){
      $(kb.html).center();
    });
  };

}