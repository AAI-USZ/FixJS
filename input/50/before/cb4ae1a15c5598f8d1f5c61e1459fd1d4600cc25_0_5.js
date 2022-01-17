function(){
        file.attr('id', 'file_fiddle.fake');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
      }