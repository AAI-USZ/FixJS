function(container)
{
    if(this.isEnabled())
    {
        $(container).append(
            "<div class=\"slide\">" +
                "<div class=\"slide_content\">" +
                    ( this.isRead() ? "" : "<img src=\"assets/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">") +
                    "<a href=\"#\" onclick=\"chrome.tabs.create({url: '" + this.siteURL + "'})\"><img class=\"teeImage\" src=\"" + this.getTeeImage() + "\"></a>" +                
                "</div>" +
                "<div class=\"caption\" style=\"bottom:0\">" +
                    "<p>" + this.siteDisplayName + ": " + this.getTeeTitle() +"</p>" +
                "</div>" +
            "</div>"
        );
        this.setRead(true);
    }
}