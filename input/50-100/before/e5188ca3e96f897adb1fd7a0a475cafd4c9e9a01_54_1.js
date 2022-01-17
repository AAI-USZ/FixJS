function(win, tagName, attributes, text, changedAttributes)
{
   this.win = win;
   this.tagName = tagName;
   this.attributes = attributes;
   this.characterData = text;
   if (changedAttributes)
       this.changedAttributes = changedAttributes;
   else
       this.changedAttributes = attributes;
}