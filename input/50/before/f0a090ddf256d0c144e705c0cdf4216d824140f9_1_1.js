function(doc){
      map.push(' <url><loc>http://docs.angularjs.org/#!/' +
                            encode(doc.section) + '/' +
                            encode(doc.id) +
                     '</loc><changefreq>weekly</changefreq></url>');
    }