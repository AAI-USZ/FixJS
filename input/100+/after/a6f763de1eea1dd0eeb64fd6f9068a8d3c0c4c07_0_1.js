function () {

            this.mockMustache.expects('to_html').once();

            $('#the-link').simulate('click');

            // Check what parameters were passed to the request.
            assert.equals(this.requests.length, 1);
            assert.equals(parseQuery(this.requests[0].url),
                {"needsTemplate": "true", 'ts': '',
                    thisURL: "http://localhost:1111/sessions/39fc6822-0718-4126-9a1b-a51f4ba29909/resources/"
                });


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