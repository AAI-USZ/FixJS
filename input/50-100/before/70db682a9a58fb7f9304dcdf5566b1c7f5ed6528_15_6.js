function(from_form){var hidden=0;if((!this.perm[this.df.permlevel])||(!this.perm[this.df.permlevel][READ])||this.df.hidden){hidden=1;}
if(hidden){if(this.row)this.row.hide();}else{if(this.collapsible){}}}