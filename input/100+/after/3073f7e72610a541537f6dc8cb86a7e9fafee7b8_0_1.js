function(item,tag,weight,kno){
	var itemkey=((typeof item === 'object')?(objectkey(item)):(item));
	if ((typeof tag === 'string')&&(kno)) tag=kno.probe(tag)||tag;
	var tagkey=(((typeof tag === 'string')&&(tag))||
		    ((tag.tagString)&&(tag.tagString()))||
		    (objectkey(tag)));
	var items=this.items, tags=this.tags;
	var alltags=this._alltags, allitems=this._allitems;
	var tagfreqs=this.tagfreqs;
	var tagscores=this.tagscores;
	var itemv=false, tagv=false, iscores=false, tscores=false;
	if ((weight)&&(typeof weight !== 'number')) weight=1;
	else if (!(weight)) weight=0;
	// items maps tagkeys to arrays of items
	if (items.hasOwnProperty(tagkey)) {
	    itemv=items[tagkey];
	    iscores=itemv.scores;
	    if (iscores[itemkey])
		iscores[itemkey]+=weight;
	    else {
		itemv.push(itemkey);
		iscores[itemkey]=weight;}
	    var freq=tagfreqs[tagkey]+1;
	    if (freq>this.maxfreq) this.maxfreq=freq;
	    tagfreqs[tagkey]=freq;}
	else {
	    items[tagkey]=itemv=[itemkey];
	    itemv.scores={};
	    itemv.scores[itemkey]=weight;
	    tagfreqs[tagkey]=1;
	    if (this.maxfreq===0) this.maxfreq=1;
	    alltags.push(tagkey);
	    if (tag!==tagkey) alltags[tagkey]=tag;}
	// Initialize the scores property
	// tags maps items to their tags
	if (tags.hasOwnProperty(itemkey)) {
	    tagv=tags[itemkey];
	    tscores=tagv.scores;
	    if (tscores[itemkey])
		tscores[itemkey]+=weight||1;
	    else {
		tagv.push(tagkey);
		tscores[itemkey]=weight||1;}}
	else {
	    tags[itemkey]=tagv=[tagkey];
	    tagv.scores={tagkey:weight||1};
	    allitems.push(itemkey);}
	if (weight) {
	    var tscores=tagv.scores;
	    if (!(tscores)) tagv.scores=tscores={};
	    var tagscore=(tagscores[tagkey]||0)+weight;
	    tagscores[tagkey]=tagscore;
	    if (tagscore>this.maxscore) this.maxscore=tagscore;
	    if (tscores[itemkey]) tscores[itemkey]+=weight;
	    else tscores[itemkey]=weight;}
	if ((tag)&&(tag._always)) {
	    var always=tag._always;
	    var i=0; var len=always.length;
	    while (i<len) {
		var genl=always[i++];
		var gkey=(((typeof genl === 'string')&&(genl))||
			  ((genl.tagString)&&(genl.tagString()))||
			  (objectkey(genl)));
		this.add(itemkey,gkey,((weight)&&(weight>i)&&(weight-i)));}}
	// Invalidate ranks.  In the future, this might do something
	// more incremental
	this.ranks=false;}