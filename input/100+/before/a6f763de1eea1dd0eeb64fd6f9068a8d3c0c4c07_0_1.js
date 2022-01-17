function () {

            this.mockMustache.expects('to_html').once();

            $('#the-link').simulate('click');

            // Check what parameters were passed to the request.
            assert.equals(this.requests.length, 1);
            assert.equals(parseQuery(this.requests[0].url),
                {"needsTemplate": "true", 'ts': ''});

            // Receive the response
            this.requests[0].respond(200,
                {'Content-Type': 'application/json; charset=UTF-8'},
                JSON.stringify({
                    microtemplate: 'THIS IS A PUSHDOWN',
                    data: {}
                })
            );

            // bump the time
            this.clock.tick(400);

            this.mockMustache.verify();

            assert($('#popper-pushdown-mypushdown')
                .is(':visible'));
        }