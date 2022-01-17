function() {
            assert.equal(tech.getTechRelativePath(), PATH.unixToOs(process.env.COVER? 'bem/lib-cov/legacy-techs/css' : 'bem/lib/legacy-techs/css'));
        }