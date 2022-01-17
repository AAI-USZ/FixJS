function () {

      var success_handler = sinon.spy() ;
      var error_handler = sinon.spy() ;

      // Normal operation
      openmdao.model.setFile("filepath", "file contents", undefined,
                             success_handler, error_handler);
      assertEquals("file/filepath", this.requests[0].url);
      assertEquals(this.requests[0].method, "POST" );
      assertEquals("contents=file+contents", this.requests[0].requestBody);
      this.requests[0].respond(200, { "Content-Type": "text/plain" }, '' ) ;
      sinon.assert.calledOnce(success_handler);
      sinon.assert.notCalled(error_handler);

      // Check error handler
      openmdao.model.setFile("filepath", "file contents", undefined,
                             success_handler, error_handler);
      this.requests[1].respond(500, { "Content-Type": "text/plain" }, '');
      sinon.assert.calledOnce(success_handler);
      sinon.assert.calledOnce(error_handler);

      // test what happens when backslash is in filepath
      openmdao.model.setFile( "file\\path", "file contents", undefined,
                             success_handler, error_handler);
      assertEquals("file/file/path", this.requests[2].url);
      assertEquals( this.requests.length, 3 ) ;
      this.requests[2].respond(200, { "Content-Type": "text/plain" }, '' ) ;
      sinon.assert.calledTwice(success_handler);
      sinon.assert.calledOnce(error_handler);

  }