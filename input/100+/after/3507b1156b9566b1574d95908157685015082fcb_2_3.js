function(lastClass) {
        return '\
<div class="companyhalftile' + (lastClass?' companyhalftilelast '+lastClass:'') + '">\
' + this.openanchor + '\
    <div class="companyhalflogo tileimg halftileimg noimage hoverlink" style="' + this.imgStyle + '"></div>\
<!--\
    <div class="halftiledays"></div>\
    <div class="halftiledaystext">' + this.daystext + '</div>\
    <div class="halftiletype"></div>\
    <div class="halftiletypetext">' + this.suggested_text + '</div>\
-->\
' + this.closeanchor + '\
' + this.openanchor + '\
    <div class="companyhalftitle hoverlink">' + this.name + '</div>\
' + this.closeanchor + '\
    <div class="companyhalftext">\
        ' + this.catlinked +  '\
    </div>\
    <div class="companyhalftext">\
        ' + this.brief_address_inp + '\
    </div>\
    <div class="companyhalftext">' + this.mantraplussuggest + '</div>\
</div>\
';
    }