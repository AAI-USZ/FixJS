function(){
  

    it('I can create a table and render it', function(){    
        
        var req = calipsoHelper.requests.testUser,
            output = table.render(req, table1);

        output.should.include('my-table');
        output.should.include('/data');

    });

  }