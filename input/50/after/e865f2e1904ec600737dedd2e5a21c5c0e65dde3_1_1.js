function ( data ) {
                    var renderData = SinopseMaker.content.toHtml( data );
                    var holderData = document.createElement('div');
                        holderData.appendChild( renderData );

                    self.insertHtml( holderData.innerHTML );
                }