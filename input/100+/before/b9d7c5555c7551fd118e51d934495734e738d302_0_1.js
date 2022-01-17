function() {
            var self = this;

            if( self.options.sizeTotal === null ) {
                self.options.sizeTypes.type   = self.options.type == 'horizontal' ? 'width' : 'height';
                self.options.sizeTypes.nav    = self.options.type == 'horizontal' ? 'left' : 'top';
                self.options.sizeTypes.margin = self.options.type == 'horizontal' ? 'margin-right' : 'margin-bottom';

                if( self.options.defaultSizes ) {
                    var size   = parseInt( self.options.$item.slice(0, 1).css( self.options.sizeTypes.type ).replace('px', '') ), 
                        margin = parseInt( self.options.$item.slice(0, 1).css( self.options.sizeTypes.margin ).replace('px', '') );

                    self.options.sizeTotal += ( self.options.totalItens * size );
                    self.options.sizeTotal += ( ( self.options.totalItens * margin ) - margin );

                    // verificando se é impar pra adicionar na soma 
                    if( self.options.$item.size() % self.options.columns !== 0 ) {
                        self.options.sizeTotal += ( size + margin );
                    }

                    // dividindo pelas colunas 
                    self.options.sizeTotal  = self.options.sizeTotal / self.options.columns;
                } else {
                    var size   = 0, 
                        margin = 0;

                    self.options.$item.each(function() {
                        var $this = $this;

                        size   += parseInt( $this.slice(0, 1).css( self.options.sizeTypes.type ).replace('px', '') ), 
                        margin += parseInt( $this.slice(0, 1).css( self.options.sizeTypes.margin ).replace('px', '') );
                    });

                    self.options.sizeTotal = ( size + margin ) - self.options.size;
                    self.options.sizeTotal = self.options.sizeTotal / self.options.columns;
                }

                // removendo a ultima margem top ou bottom do ultimo elemento 
                if( self.options.removeLastMargin ) {
                    self.options.$item
                    .slice( (self.options.totalItens - 1), self.options.totalItens )
                    .css(self.options.sizeTypes.margin, '0px');
                }
            }

            /* tamanho do runner */ 
            if( self.options.sizeTypes.type == 'height' ) {
                self.options.$runner.css({
                    'height' : self.options.sizeTotal + 'px'
                });
            } else {
                self.options.$runner.css({
                    'width' : self.options.sizeTotal + 'px'
                });
            }

            /* escondendo as setas se necessario */ 
            if( self.options.sizeTotal < self.options.size ) {
                self.options.$navLeft.hide();
                self.options.$navRight.hide();
            }

            /* descontando o tamanho do box */ 
            self.options.sizeTotal = self.options.sizeTotal - self.options.size;
        }