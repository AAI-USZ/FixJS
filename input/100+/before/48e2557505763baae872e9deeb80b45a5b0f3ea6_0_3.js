function(x,y,width,height,radius, text )
{
	this.context.lineWidth = 1;
	this.context.fillStyle = "#ffffff";
	this.context.strokeStyle = "#000000";
	 
	this.context.beginPath();
	this.context.moveTo(x + radius, y);
	this.context.lineTo(x + width - radius, y);
	this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
	this.context.lineTo(x + width, y + height - radius);
	this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	this.context.lineTo(x + radius, y + height);
	this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
	this.context.lineTo(x, y + radius);
	this.context.quadraticCurveTo(x, y, x + radius, y);
	this.context.closePath();
	this.context.fill();
	this.context.stroke();
	
	if(text)
	{
 	  var textsize=width/15;
	  var temp = text.split(",")[0];
	  var etal="";
	  if(temp[1])
	  {
  		 etal = " et al.";
	  }
	  
	  var author = temp.split(".")[0] + "." + temp.split(".")[1] + etal;
	  var year = text.split(".  ")[1];
	  var title = text.split(".  ")[2];
	
	  this.context.fillStyle = "blue";
	  this.context.font = "italic "+textsize+"pt Arial";
      this.context.lineWidth = 1;
	  this.context.fillText( author , x + width/2 - this.context.measureText(author).width/2, y+height/6);
	
	  this.context.fillStyle = "blue";
	  this.context.font = "italic "+textsize+"pt Arial";
      this.context.lineWidth = 1;
	  this.context.fillText( year , x + width/2 - this.context.measureText(year).width/2, y+height/3);

	  title = "\""+title+"\"";
	  textsize=width/20;
      this.context.fillStyle = 'green';
      this.context.font = "italic "+textsize+"pt Calibri";
      this.context.lineWidth = 1;
    	
      var wc = title.split(" ");
      var line = "";
      var lineheight=0;
      //console.log(wc.length);
        
      for(var i = 0; i < wc.length; i++) 
      {
        var test = line + wc[i] + " ";
            
        if(this.context.measureText(test).width > width * 0.98 ) 
        { 
          this.context.fillText(line, x + width/2 - this.context.measureText(line).width/2, y + height/2 + lineheight);
          line = wc[i] + " ";
          lineheight += textsize+5;
        }
        else
        {   
       	  line = test;
        }
      }
   	  this.context.fillText(line, x + width/2 - this.context.measureText(line).width/2, y + height/2 + lineheight);
	}
	else
	{
		  this.context.fillStyle = "orange";
		  var textsize=width/20;
		  this.context.font = "italic "+textsize+"pt Arial";
	      this.context.lineWidth = 1;
	      var string = "Please select a paper ...";
		  this.context.fillText( string , x + width/2 - this.context.measureText(string).width/2, y+height/6);
	}
}