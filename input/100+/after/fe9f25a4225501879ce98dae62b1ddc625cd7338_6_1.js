function search(info, cb) {
  console.dir(info.args);
  var q = info.args || []
    , nugget = q[0] == 'nugget' ? q.splice(0, 1)[0] == 'nugget' : false
    , lang = q[0] && q[0].length == 2 ? q.splice(0, 1)[0] : 'en'
    , api = 'http://' + lang + '.wikipedia.org/w/api.php?action=query&list=search'
          + '&format=json&srprop=snippet&srlimit=10&srsearch=';

  if (nugget) {
    request('http://dykapi.appspot.com/api/?format=json',
    function (err, res, data) {
      if (err) { cb(); return; }
      try { cb({ type: 'nugget', data: JSON.parse(data).response}); }
      catch (err) { cb(); }});
  } else {
    request({url: api + escape(q.join(' ')),
      headers: {'User-Agent': 'tuhBot IRC-bot by tuhoojabotti'}
    }, function (err, res, data) {
      if (err) { cb(); return; }
      try { cb({ type: 'wiki', lang: lang, data: JSON.parse(data)}); }
      catch (err) { cb(); }});
  }
}