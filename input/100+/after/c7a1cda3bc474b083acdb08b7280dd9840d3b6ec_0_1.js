function() {

  /* This bootstrap script is documented at http://developer.joshfire.com/ */

  var Joshfire = window.Joshfire || {};

  Joshfire.factory = {

    globalConfig: {"DATAVERSION":"1","DATAHOSTPORT":"localhost:40020","STATSHOSTPORT":"localhost:40023","HOSTPORT":"localhost:40021"},

    config: { "app": { "id": "4fc9d6120767864406000069", "icon": null, "logo": "http://www.yourlogoresources.com/wp-content/uploads/2011/09/ted-logo-448x181.png", "name": "Metro", "version": "1.0" }, "template": { "id": "4f9668187c4553dd8e00023a", "name": "sleek", "version": "0.1.3", "options": { "color": "gray" } } },

    device: {"type":"phone"},

    plugins: {}

  };

  Joshfire.factory.config.deploy = {"env":"dev","type":"preview","id":""};

  Joshfire.factory.config.datasources = { "main": [/*{ "name": "Feed", "db": "feed", "col": "rss", "query": { "filter": { "url": "http://blog.steren.fr/feed" } }, "runatclient": false, "missingKeys": [], "outputType": "BlogPosting" }, */{ "name": "Flickr", "db": "flickr", "col": "photos", "query": { "filter": { "search": "bemyapp" } }, "runatclient": true, "missingKeys": ["api_key"], "outputType": "ImageObject" }, { "name": "Youtube", "db": "youtube", "col": "videos", "query": { "filter": { "search": "bemyapp" } }, "runatclient": true, "missingKeys": [], "outputType": "VideoObject" }] };

  window.Joshfire = Joshfire;



}