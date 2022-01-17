function(){
        file.attr('id', 'file_fiddle.html');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      }