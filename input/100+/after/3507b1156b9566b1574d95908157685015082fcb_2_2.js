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
        ' + this.categoryaddresstext + '\
    </div>\
    <div class="companybannertextgrey">' + this.foundertext + '</div>\
    <div class="companybannertextgrey">' + this.finance_line + '</div>\
    <div class="companybannertextgrey">' + this.mantra + '</div>\
</div>\
';
    }