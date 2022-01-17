function(){
        file.attr('id', 'file_fiddle.js');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      }