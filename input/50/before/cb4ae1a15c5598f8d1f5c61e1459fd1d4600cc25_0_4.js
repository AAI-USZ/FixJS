function(){
        file.attr('id', 'file_fiddle.manifest');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      }