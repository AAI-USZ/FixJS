function(){
    if(this.dict == null)
    {
      return false;
    }
    var location, type, lset, lettr, sectn, lst, let, indx, counter=0;
    var title1, title2, posel, kgp, tmp, closeIcon;
    this.html = document.createElement('div');
    this.html.setAttribute('class', 'kbwpr');
    closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'kbclose');
    closeIcon.innerHTML = '&times;';
    this.html.appendChild(closeIcon);
    for(location in this.dict){
      posel = document.createElement('span');
      posel.setAttribute('id', 'kbpos'+location);
      
      for(type in this.dict[location]){
	
	sectn = new KeySection();
	sectn.title = type;
	sectn.elmnt = document.createElement('div');
	sectn.elmnt.setAttribute('class', 'kbsection');
	title1 = document.createElement('div');
	title1.setAttribute('class', 'label kbsectitle');
	title1.innerHTML = sectn.title;
	sectn.elmnt.appendChild(title1);
	for(indx in this.dict[location][type]){
	  for(lset in this.dict[location][type][indx]){
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
	    for(lettr in this.dict[location][type][indx][lset]){
	      let = new Letter();
	      let.letter = lettr;
	      let.isScript = checkCharWidth(lettr);
	      let.title = this.dict[location][type][indx][lset][lettr];
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
  }