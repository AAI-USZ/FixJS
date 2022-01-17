function(callback) {
               var data = {
                   name: 'testACL',
                   public_read: false,
                   public_write: false
               }
            this.sequence.push(function() { Cloud.ACLs.update(data,
               this.async(function(e) {
                   valueOf(e.success).shouldBeTrue();
                   valueOf(e.error).shouldBeFalse();
                   valueOf(e.acls[0].public_read).shouldBeFalse();
                   valueOf(e.acls[0].public_write).shouldBeFalse();
                   valueOf(e.acls[0].readers.length).shouldBe(1);
                   valueOf(e.acls[0].writers.length).shouldBe(1);
               })
            )});
            this.sequence.push(function() { Cloud.Users.query(
                this.async(function(e) {
                    valueOf(e.success).shouldBeTrue();
                    valueOf(e.error).shouldBeFalse();
                    valueOf(e.users.length).shouldBe(2);
                    callback.ACLs.chatUserId = (e.users[0].id == callback.Utils.userId) ? e.users[1].id : e.users[0].id;
                })
            )});
            this.sequence.push(function() {	Cloud.ACLs.addUser({
                    name: 'testACL',
                    reader_ids: callback.ACLs.chatUserId,
                    writer_ids: callback.ACLs.chatUserId
                },
   				this.async(function(e) {
   					valueOf(e.success).shouldBeTrue();
   					valueOf(e.error).shouldBeFalse();
                })
            )});
            this.sequence.push(function() { Cloud.ACLs.show({
                    name: 'testACL'
                },
                this.async(function(e) {
                    valueOf(e.success).shouldBeTrue();
                  	valueOf(e.error).shouldBeFalse();
                    valueOf(e.acls[0].public_read).shouldBeFalse();
                    valueOf(e.acls[0].public_write).shouldBeFalse();
                    valueOf(e.acls[0].readers.length).shouldBe(2);
                    valueOf(e.acls[0].writers.length).shouldBe(2);
                })
            )});
            this.sequence.push(function() {	Cloud.ACLs.removeUser({
                    name: 'testACL',
                    reader_ids: callback.ACLs.chatUserId,
                    writer_ids: ''
                },
                this.async(function(e) {
                    valueOf(e.success).shouldBeTrue();
                    valueOf(e.error).shouldBeFalse();
               })
            )});
            this.sequence.push(function() { Cloud.ACLs.show({
                    name: 'testACL'
               },
               this.async(function(e) {
                   valueOf(e.success).shouldBeTrue();
                   valueOf(e.error).shouldBeFalse();
                   valueOf(e.acls[0].public_read).shouldBeFalse();
                   valueOf(e.acls[0].public_write).shouldBeFalse();
                   valueOf(e.acls[0].readers.length).shouldBe(1);
                   valueOf(e.acls[0].writers.length).shouldBe(2);
                   valueOf(e.acls[0].readers[0]).shouldBe(callback.Utils.userId);
               })
            )});
        }