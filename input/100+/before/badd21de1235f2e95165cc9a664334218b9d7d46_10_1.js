function icon_render(target, page) {
    /*
     * <li class="icon" dataset-origin="zzz">
     *   <div>
     *     <img src="the icon image path"></img>
     *     <span class="label">label</span>
     *   </div>
     *   <span class="options"></span>
     * </li>
     */
    this.dragabbleSection = page.parentNode;

    var container = this.container = document.createElement('li');
    container.className = 'icon';
    container.dataset.origin = this.descriptor.origin;

    // Icon container
    var icon = this.icon = document.createElement('div');

    // Image
    var img = document.createElement('img');
    img.src = this.descriptor.icon;
    icon.appendChild(img);

    img.onerror = function imgError() {
      img.src =
        'http://' + document.location.host + '/resources/images/Unknown.png';
    }

    // Label

    // wrapper of the label -> overflow text should be centered
    // in draggable mode
    var wrapper = document.createElement('span');
    wrapper.className = 'labelWrapper';
    var label = this.label = document.createElement('span');
    label.textContent = this.descriptor.name;
    wrapper.appendChild(label);

    icon.appendChild(wrapper);

    container.appendChild(icon);

    // Menu button to delete the app
    var options = document.createElement('span');
    options.className = 'options';
    options.dataset.origin = this.descriptor.origin;
    container.appendChild(options);

    target.appendChild(container);
  }