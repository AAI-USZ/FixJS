function (dom_id, config_override) {

  this.configuration = {

    "title": "EV TOOL 2",
    "subtitle": "Time Series Explorer",

    "station_list": "44025|LONG ISLAND 33\n44027|Jonesport, Maine",

    "date_start": "2010-01-01",
    "date_end": "2010-01-14",

    "station1": "44025",
    "param1": "sea_water_salinity",
    "station2": "44027",
    "param2": "sea_water_temperature"

  };

  this.parameters = {
    "sea_water_temperature": {
      "name": "Sea Water Temperature",
      "label": "Sea Water Temperature (C)",
      "query_param": "sea_water_temperature",
      "column": "sea_water_temperature (C)",
      "units": "&deg;C",
      "units2": "Degrees Celcius"
    },
    "sea_water_salinity": {
      "name": "Sea Water Salinity",
      "label": "Sea Water Salinity",
      "query_param": "sea_water_salinity",
      "column": "sea_water_salinity (psu)",
      "units": "",
      "units2": ""
    },
    "air_temperature": {
      "name": "Air Temperature",
      "label": "Air Temperature (C)",
      "query_param": "air_temperature",
      "column": "air_temperature (C)",
      "units": "&deg;C",
      "units2": "Degrees Celcius"
    },
    "air_pressure_at_sea_level": {
      "name": "Air Pressure",
      "label": "Air Pressure (hPa)",
      "query_param": "air_pressure_at_sea_level",
      "column": "air_pressure_at_sea_level (hPa)",
      "units": "hPa",
      "units2": "hPa"
    },
    "waves": {
      "name": "Significant Wave Height",
      "label": "Significant Wave Height (m)",
      "query_param": "waves",
      "column": "sea_surface_wave_significant_height (m)",
      "units": "meters",
      "units2": "meters"
    },
    "winds": {
      "name": "Wind Speed",
      "label": "Wind Speed (m/s)",
      "query_param": "winds",
      "column": "wind_speed (m/s)",
      "units": "m/s",
      "units2": "m/s"
    }
  };

  // NBDC Station List: --> http://www.ndbc.noaa.gov/to_station.shtml
  this.stations = {}
  
	// Identify the DOM element where the Visualization will be placed.
	if(typeof(dom_id)!="undefined") this.dom_element = dom_id; else this.dom_element = "ev";

	// Create placeholder loading image
//	this.loadingDiv();
	
	// do configuration overrides exist? if so, parse overrides
	this.parse_configuration(config_override);

	// Draw graph
	this.draw();

}