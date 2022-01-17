function(err, scripts) {
        should.not.exist(err);
        scripts.should.include('<script title="/test2.js" src="/test2.js"></script>\r\n<script title="/test1.js" src="/test1.js">');
        done();
      }