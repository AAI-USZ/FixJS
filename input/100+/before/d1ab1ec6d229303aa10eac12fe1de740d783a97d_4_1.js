function() {
        it('should accept mixed input', function() {
            (new Blob('abcdef')).result.should.equal('abcdef');
            (new Blob(['abc', 'def'])).result.should.equal('abcdef');
            (new Blob(['abc', new Blob('def')])).result.should.equal('abcdef');
        });
    }