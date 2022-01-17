function(){
      var otherBullet = bullet == '*' ? '#' : '*',
      otherTag = tag == 'ul' ? 'ol' : 'ul',
      otherListType = listType == 'orderedList' ? 'unorderedList' : 'orderedList';
      
      w.set(otherBullet + " firstList\n\ntest\n\n" + otherBullet + " secondList")
        .select("p")
        .off(listType)
        .off(otherListType)
        .click("."+listType)
        .match(tag,1)
        .match(tag + " :first-child:contains(test)")
        .match("li",3)
        .match(otherTag,2)
        .notMatch('p')
        .on(listType);
    }