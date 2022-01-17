function(){
          cy
            .one('layoutstop', function(){
              cy.nodes().trigger('updateposition'); // indicate the nodes should update entity position after the layout is done
            })

            .layout({
              name: 'arbor'
            })
          ;
        }