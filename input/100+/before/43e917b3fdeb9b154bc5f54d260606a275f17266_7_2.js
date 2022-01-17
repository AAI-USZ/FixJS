function() {
            bot.channels.contains( chan ).should.equal( false )
            return STATUS.REMOVE
          }