function(){
  var subject;

  context('when location is a gist', function(){
    var location = {host: "gist.github.com"};

    it('creates a Gist link', function(){
      spyOn(GitFiddle, 'Gist').andCallThrough();
      spyOn(GitFiddle, 'Repo');

      GitFiddle(location);
      expect(GitFiddle.Gist).toHaveBeenCalled();
      expect(GitFiddle.Repo).not.toHaveBeenCalled();
    });

    context('when gist sounds like a fiddle', function(){
      it('calls insert_link', function(){
        spyOn(GitFiddle.Gist.prototype, 'sounds_like_a_fiddle').andReturn(true);
        spyOn(GitFiddle.Gist.prototype, 'insert_link');

        GitFiddle(location);
        expect(GitFiddle.Gist.prototype.insert_link).toHaveBeenCalled();
      });
    });

    context('when gist does not sound like a fiddle', function(){
      it('should not call insert_link', function(){
        spyOn(GitFiddle.Gist.prototype, 'sounds_like_a_fiddle').andReturn(false);
        spyOn(GitFiddle.Gist.prototype, 'insert_link');

        GitFiddle(location);
        expect(GitFiddle.Gist.prototype.insert_link).not.toHaveBeenCalled();
      });
    });
  });
  context('when location is a repo', function(){
    it('creates a Repo link', function(){
      var location = {host: "github.com"};
      spyOn(GitFiddle, 'Gist');
      spyOn(GitFiddle, 'Repo');

      GitFiddle(location);
      expect(GitFiddle.Repo).toHaveBeenCalled();
      expect(GitFiddle.Gist).not.toHaveBeenCalled();
    });
  });
}