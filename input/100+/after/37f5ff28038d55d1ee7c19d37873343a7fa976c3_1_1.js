function() {
      expect(build.number).toEqual(1);
      expect(build.color).toEqual('red');
      expect(build.duration).toEqual(20);
      expect(build.started_at).toEqual('2010-11-11T12:00:00Z');
      expect(build.finished_at).toEqual('2010-11-11T12:00:20Z');
      expect(build.log).toEqual('enginex build 1 log ...');

      expect(build.commit).toEqual('565294c');
      expect(build.message).toEqual('Update Capybara');
      expect(build.committed_at).toEqual('2010-11-11T11:58:00Z');
      expect(build.committer_name).toEqual('Jose Valim');
      expect(build.committer_email).toEqual('jose@email.com');

      expect(build.repository.name).toEqual('josevalim/enginex');
      expect(build.repository.url).toEqual('http://github.com/josevalim/enginex');
      expect(build.repository.last_duration).toEqual(30);
    }