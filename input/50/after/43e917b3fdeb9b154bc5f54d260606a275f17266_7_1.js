function() {
            bot.channels.has( o.id( "#kickedfrom" ) ).should.equal( false )
            done()
          }