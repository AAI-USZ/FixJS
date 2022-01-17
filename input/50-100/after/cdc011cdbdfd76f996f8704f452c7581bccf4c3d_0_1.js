function(layout){var hidden=0;if((!this.perm[this.df.permlevel])||(!this.perm[this.df.permlevel][READ])||this.df.hidden){hidden=1;}
if(this.set_hidden!=hidden){if(hidden)
this.cell.hide();else
this.cell.show();this.set_hidden=hidden;}}