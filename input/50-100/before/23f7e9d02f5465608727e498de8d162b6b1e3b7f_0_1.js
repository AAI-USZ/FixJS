function(role, partner) {
       $('#' + role).append("<a href='" + partner["link"] + "'><img height='40' src='" + partner["picture"]["data"]["url"] + "'/>" + partner["first_name"] + "</a> ");
          console.log(partner);
  }