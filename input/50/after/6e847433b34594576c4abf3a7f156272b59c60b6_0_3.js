function(json) {
                    // console.log('poll json', json);
                    _this.receiveMessages(json);

                    // reset retry time counter
                    _this.errorSleepTime = 500;

                    console.log('-> poll after receiveMessages');
                    _this.poll();
                }