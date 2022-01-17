function(){
        this.page.$("input.mood").attr("checked", false) //radio button hax
        expect(app.frame.get("frame_name")).not.toBe("Typist")
        this.page.$("input.aspect_ids").val("public")
        this.page.$("input[value='Typist']").attr("checked", "checked")
        this.page.$("input.services[value=facebook]").attr("checked", "checked")
        this.page.$("input.services[value=twitter]").attr("checked", "checked")
      }