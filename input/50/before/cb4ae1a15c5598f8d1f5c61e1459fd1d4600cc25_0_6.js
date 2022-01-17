function(){
        file.attr('id', 'file_fiddle');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
      }