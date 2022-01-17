function ( data ) {
                            var renderData = SinopseMaker.html.render( data );
                            var holderData = document.createElement('div');
                                holderData.appendChild( renderData );

                            self.insertHtml( holderData.innerHTML );
                        }