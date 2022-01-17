function(){
        var getOlderHost = utils.getOlderHost;
        var serverPort = 'nowall.be';
        // console.log(utils.encodeOld('com|net|org|edu|info|tv|us|tw|jp|ko|in'))
        getOlderHost('www.ozymr3swo2-myw-36.nowall.be', serverPort).should.equal('www.epochtimes.com.tw')
        getOlderHost('www.ozymr3swo2-myw.nowall.be', serverPort).should.equal('www.epochtimes.com')
        getOlderHost('sub.sub.ozymr3swo2-myw.nowall.be', serverPort).should.equal('sub.sub.epochtimes.com')
        getOlderHost('ozymr3swo2-myw.nowall.be', serverPort).should.equal('epochtimes.com')
        should.not.exist(getOlderHost('www.ozymr3swo2-s0m.nowall.be', serverPort))
    }