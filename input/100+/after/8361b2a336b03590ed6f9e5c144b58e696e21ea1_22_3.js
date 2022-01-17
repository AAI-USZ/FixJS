function(callback) {
            var data = {
	            name:'testACL',
	            user_id:callback.Utils.userId
            };
            this.sequence.push(function() { Cloud.ACLs.checkUser({
                    name: 'testACL',
                    user_id: callback.Utils.userId
                },
                this.async(function(e) {
                    valueOf(e.success).shouldBeTrue();
                    valueOf(e.error).shouldBeFalse();
                    valueOf(e.permission['read permission']).shouldBe('yes');
                    valueOf(e.permission['write permission']).shouldBe('yes');
                })
            )});
            this.sequence.push(function() { Cloud.ACLs.checkUser({
                   name: 'testACL',
                   user_id: callback.ACLs.chatUserId
               },
               this.async(function(e) {
                   valueOf(e.success).shouldBeTrue();
                   valueOf(e.error).shouldBeFalse();
                   valueOf(e.permission['read permission']).shouldBe('no');
                   valueOf(e.permission['write permission']).shouldBe('yes');
               })
            )});
        }