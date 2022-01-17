function(e) {
                    valueOf(e.success).shouldBeTrue();
                    valueOf(e.error).shouldBeFalse();
                    valueOf(e.users[0].tags).shouldContain('golf');
                    valueOf(e.users[0].tags).shouldContain('snowboarding');
                    valueOf(e.users[0].first_name).shouldBe('joe')
                    valueOf(e.users[0].last_name).shouldBe('user');
                    valueOf(e.users[0].custom_fields.color).shouldBe('red');
                    valueOf(e.users[0].custom_fields.number).shouldBe(5);
                }