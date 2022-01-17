function(){
    res = {};

    req = {
      connection: {
        encrypted: false
      },
      headers: {
        host: '127.0.0.1:80',
        'accept-encoding': 'gzip,deflate,sdch'
      },
      protocol: 'http',
      url: 'http://www.example.com/faq.html'
    };
  }