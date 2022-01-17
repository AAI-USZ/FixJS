function (installation) {
                var buttonText = '';
                var ownerName;
                if (installation.get('owner_name')) {
                    buttonText = "<span class='owner_name'>" + installation.get('owner_name') + "</span<br/>" + installation.getLocDescription();  // this may no longer be required here, if installations only have the one type of locdescription
                } else {
                    buttonText = "<span class='owner_name unknown'>Unknown Owner</span><br/>" + installation.getLocDescription();
                }
                
                var complianceLevel;
                if (installation.get('compliance_level_override')) {
                    complianceLevel = "<span class='compliance "+installation.get('compliance_level_override')+"'></span>";
                } else if (installation.get('compliance_level')) {
                    complianceLevel = "<span class='compliance "+installation.get('compliance_level')+"'></span>";
                } else {
                    complianceLevel = "<span class='compliance unknown'></span>";
                }
                
/*                var thumb;
                var obj = report.get('sign') || report.get('camera');                       // FIXME when we know how photos are going to look
                if (obj && obj.photos && obj.photos[0] && obj.photos[0].thumb_url) {
                    thumb = "<img src='"+veos.model.baseURL + obj.photos[0].thumb_url+"' />";
                } else {
                    thumb = "";
                }*/

                var item = jQuery("<li><a href='report-details.html?id="+installation.id+"'>"+complianceLevel+thumb+" "+buttonText+"</a></li>");
                list.append(item);
                list.listview('refresh');
            }