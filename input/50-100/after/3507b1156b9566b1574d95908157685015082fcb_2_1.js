function(lastClass) {
            html = '\
<span class="span-4 '+ (lastClass?lastClass:'') +'">\
<div class="tile">\
' + this.openanchor + '\
<div class="tileimg fourthtileimage hoverlink" style="' + this.imgStyle + '"></div>\
' + this.closeanchor + '\
<!--\
<div class="tiledays"></div>\
<div class="tiledaystext">' + this.daystext + '</div>\
<div class="tiletype"></div>\
<div class="tiletypetext">' + this.categoryUC + '</div>\
<div class="tilepoints"></div>\
-->\
<div class="tilepointstext">\
    <div class="tileposted">' + this.suggested_text + '</div>\
</div>\
<p class="tiledesc">\
' + this.openanchor + '\
    <span class="tilecompany hoverlink">' + this.name + '</span><br/>\
' + this.closeanchor + '\
    <span class="tileloc">' + this.catlinked + '</span><br/>\
    <span class="tileloc">' + this.brief_address_inp + '</span><br/>\
    <span class="tiledetails">' + this.mantra + '</span>\
</p>\
</div>\
</span>\
';
        return html;
    }