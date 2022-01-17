function() {

    it('message | message-body', function() {
        jpath('message | message-body').should.equal('.message | .message-body');
    });
    it('/message | /message-body', function() {
        jpath('/message | /message-body').should.equal('/.message | /.message-body');
    });
    it('/*/message | /*/message-body', function() {
        jpath('/*/message | /*/message-body').should.equal('/.*.message | /.*.message-body');
    });
    it('count($folders/folder[@user]) > 1', function() {
        jpath('count($folders/folder[@user]) > 1').should.equal('count(folders.folder[.user]) > 1');
    });
    it('count($folders/folder[@user]) > 1', function() {
        jpath('count($folders/folder[@user]) > 1').should.equal('count(folders.folder[.user]) > 1');
    });
    it('18n(\'Folders_Unread\', new)', function() {
        jpath('18n(\'Folders_Unread\', new)').should.equal('18n(\'Folders_Unread\', .new)')
    });
    it('string-length(new)', function() {
        jpath('string-length(new)').should.equal('string-length(.new)')
    });
}