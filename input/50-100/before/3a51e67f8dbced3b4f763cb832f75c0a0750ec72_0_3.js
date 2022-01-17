f    {
      setSelectRaw([parseInt(rect[0], 10) / xscale, parseInt(rect[1], 10) / yscale, parseInt(rect[2], 10) / xscale, parseInt(rect[3], 10) / yscale]);
      options.onSelect.call(api, unscale(Coords.getFixed()));
      Selection.enableHandles();
    }
