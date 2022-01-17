function() {
    this.getSelectedFlavor();

    if (this.selected_flavor) {
      var name = horizon.utils.truncate(this.selected_flavor.name, 14, true);
      var vcpus = horizon.utils.humanizeNumbers(this.selected_flavor.vcpus);
      var disk = horizon.utils.humanizeNumbers(this.selected_flavor.disk);
      var ephemeral = horizon.utils.humanizeNumbers(this.selected_flavor["OS-FLV-EXT-DATA:ephemeral"]);
      var disk_total = this.selected_flavor.disk + this.selected_flavor["OS-FLV-EXT-DATA:ephemeral"];
      var disk_total_display = horizon.utils.humanizeNumbers(disk_total);
      var ram = horizon.utils.humanizeNumbers(this.selected_flavor.ram);

      $("#flavor_name").html(name);
      $("#flavor_vcpus").text(vcpus);
      $("#flavor_disk").text(disk);
      $("#flavor_ephemeral").text(ephemeral);
      $("#flavor_disk_total").text(disk_total_display);
      $("#flavor_ram").text(ram);
    }
  }