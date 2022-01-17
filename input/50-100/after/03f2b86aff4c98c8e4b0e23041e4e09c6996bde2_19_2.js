function (videos) {

                    var playableSong = null;



                    $(videos).each(function(){

                        if(this.isPlayable()){

                            playableSong = this;

                            return;

                        }

                    });



                    callback(playableSong);

                }