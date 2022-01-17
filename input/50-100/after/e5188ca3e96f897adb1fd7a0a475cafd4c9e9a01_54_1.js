function(win, tagName, attributes, text, changedAttributes)
{
   this.win = win;
   this.tagName = tagName;
   this.attributes = attributes || {};
   this.characterData = text;

   this.changedAttributes = changedAttributes;
}