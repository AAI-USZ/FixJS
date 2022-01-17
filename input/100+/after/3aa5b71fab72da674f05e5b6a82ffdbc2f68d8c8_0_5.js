function bummed_text(url) {
    var url_link = Bum.link_data[url];
    var link;
    if (
	Bum.links[url] && 
	Bum.links[url]['data'] && 
	Bum.links[url]['data']['link'] && 
	!Bum.links[url]['data']['comment_id']
    ) { 
	link = Bum.link_data[Bum.links[url]['data']['link']];
    }
    var count = link && link.that && link.that.fuck_count ? link.that.fuck_count : 0;
    count += url_link && url_link.that && url_link.that.fuck_count ? url_link.that.fuck_count : 0;
    var bummed = Bum.bummed(url);
    if (bummed) {
	count--;
	return (count == 0 ? 'Bummed' :
	    (count == 1 ? 'Bummed by you and 1 other' : 'Bummed by you and ' + count + ' others'));
    }
    else {
	return (count == 1 ? '1 person was bummed by this &middot; ' : 
	    (count > 1 ? count + ' people were bummed by this &middot; ' : '')) + 
	    '<a href="#" onclick="return false">Bummer</a>';
    }
}