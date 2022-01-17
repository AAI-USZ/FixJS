function() {
        return '\
<div class="' + this.companybannertileclass + ' last">\
' + this.openanchor + '\
    <div class="companybannerlogo tileimg fulltileimg noimage hoverlink" style="' + this.imgStyle + '"></div>\
' + this.closeanchor + '\
' + this.openanchor + '\
    <div class="companybannertitle hoverlink">' + this.name + '</div>\
' + this.closeanchor + '\
    <div class="companybannertextgrey companybannermapline">\
        <span class="loctext">' + (this.category==='Other' ? 'A' : (this.category.match(/^[AEIOU]/) ? 'An '+this.category : 'A '+this.category)) +  ' company in&nbsp;</span>' + this.brief_address + '\
    </div>\
    <div class="companybannertextgrey">' + this.foundertext + '</div>\
    <div class="companybannertextgrey">' + this.finance_line + '</div>\
    <div class="companybannertextgrey">' + this.mantra + '</div>\
</div>\
';
    }