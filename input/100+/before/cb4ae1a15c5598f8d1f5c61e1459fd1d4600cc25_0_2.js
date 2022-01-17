function(){
    var file;
    beforeEach(function(){
      file = affix('#files .file').find('.file');
    });
    describe('is true if', function(){
      it('fiddle.css is found', function(){
        file.attr('id', 'file_fiddle.css');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      });
      it('fiddle.html is found', function(){
        file.attr('id', 'file_fiddle.html');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      });
      it('fiddle.js is found', function(){
        file.attr('id', 'file_fiddle.js');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      });
      it('fiddle.manifest is found', function(){
        file.attr('id', 'file_fiddle.manifest');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeTruthy();
      });
    });
    describe('is false if', function(){
      it('fiddle.(html|css|js|manifest) is not found', function(){
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
      });
      it('if fiddle.fake is found', function(){
        file.attr('id', 'file_fiddle.fake');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
      });
      it('if fiddle is found', function(){
        file.attr('id', 'file_fiddle');
        expect(new GitFiddle.Gist().sounds_like_a_fiddle()).toBeFalsy();
      });
    });
  }