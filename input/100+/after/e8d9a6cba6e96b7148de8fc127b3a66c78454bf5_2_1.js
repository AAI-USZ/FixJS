function(params) {
        this.ptolemySphere = new Longituder();  
        this.updateList.push(this.ptolemySphere);
      
        this.root.addNode(this.sphere[1]);
          //S1
          this.sphere[1].addNode( this.earth );
          this.sphere[1].addNode( this.hull );
          this.sphere[1].anchor.addNode( this.stars );
          this.sphere[1].anchor.addNode( this.ptolemySphere ); 
            this.ptolemySphere.addNode(this.ecliptic);                          
              this.ecliptic.anchor.addNode(this.sun);
            this.ptolemySphere.anchor.addNode( this.sphere[2] );          
              //S2
              this.sphere[2].addNode( this.equantPoint ); 
              this.sphere[2].anchor.addNode( this.sphere[3] );
                //S3
                this.sphere[3].anchor.addNode( this.sphere[4] );  
                  //S4
                  this.sphere[4].anchor.addNode( this.planet );
                  this.sphere[4].remove(this.sphere[4].anchor);
                  this.sphere[4].ptolemy =  new Node(); 
                  this.sphere[4].addNode(this.sphere[4].ptolemy);      
                  this.sphere[4].ptolemy.addNode(this.sphere[4].anchor);             
}