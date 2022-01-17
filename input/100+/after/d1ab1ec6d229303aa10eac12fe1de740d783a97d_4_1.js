function() {
        it('should accept mixed input', function() {
            (new Blob('abcdef')).result.should.equal('abcdef');
            (new Blob(['abc', 'def'])).result.should.equal('abcdef');
            (new Blob(['abc', new Blob('def')])).result.should.equal('abcdef');
        });

        it('should preserve encoding', function(done) {
            var checksum = Crypto.createHash('md5');
            checksum.update(fs.readFileSync(fixtures.input));

            Blob.readFile(fixtures.input, 'bin', function(err, blob) {
                Blob.writeFile(fixtures.output, blob, 'bin', function() {
                    var file = fixtures.output.replace('{checksum}', checksum.digest('hex'));
                    path.existsSync(file).should.equal(true);
                    done();
                });
            });
        });
    }