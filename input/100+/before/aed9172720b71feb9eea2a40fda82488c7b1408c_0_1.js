function (el) {
    var item = {};
    item.profilePic = el.find("img.profilePic").getlink();
    item.profileLink = el.find('.actorName a').getlink();
    var date = el.find('abbr.timestamp', el).attr('date-utime');
    item.body = el.find('.messageBody').html();
    return item;
  }