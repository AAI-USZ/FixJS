function Traveler(form) {

    /* 
       This data structure is parsed by the main loop of the programme to 
       generate the calculator form and carry out the calculations.
    */

    this.fields = {
        distance : 
        {
            lbl :  "Distance",
            value : "",
            calc: calcTotalDistance,
            parameters : ["observer_time", "acceleration"],
            units: 
            {
                "meters": 1, 
                "kilometers": 1000, 
                "light-seconds": SPEED_OF_LIGHT, 
                "light-minutes": LIGHT_MINUTE,
                "astronomical unit" : ASTRONOMICAL_UNIT,
                "light-years": LIGHT_YEAR,
                "parsec" : PARSEC
            },
            ajaxValues : "distances",
            changed : false,
            set : false,
            primary : true,
            min_val : 100,
            min_error : "This calculator is quite useless for such small distances. Try travel a bit further.",
            help_text : true
        },
        acceleration : 
        {
            lbl : "Acceleration",
            value : "",
            calc: calcAcceleration,
            parameters : ["distance", "observer_time", "max_velocity"],
            max_missing : 1,
            units: 
            {
                "m/s^2" : 1,
                "g" : 9.8
            },
            changed : false,
            set : false,
            primary : true,
            min_value : 0.00000000000000001,
            min_error : "Distance too small.",
            max_val : SPEED_OF_LIGHT - 0.001,
            max_error : "Is your spaceship on steroids? You can't accelerate so quickly.",
            def_val : "9.8",
            help_text : true
        },
        max_velocity : 
        {
            lbl : "Maximum velocity",
            value : "",
            calc : calcMaxVelocity,
            parameters : ["acceleration", "observer_time"],
            units : 
            {
                "kilometers per hour" : 0.27777777777777777777,
                "meters per second" : 1,
                "kilometers per second" : 1000,
                "speed of light" : SPEED_OF_LIGHT
            },
            ajaxValues : "velocities",
            changed : false,
            set : false,
            primary : false,
            min_val : 0.000000000000001,
            min_error : "Your velocity is too small. At this rate you won't get out your front door.",
            max_val : SPEED_OF_LIGHT - 0.001,
            max_error : "You have been watching too much Star Trek. Velocity must be less than the speed of light.",
            help_text : true
        },
        observer_time : 
        {
            lbl : "Observer time elapsed during journey",
            value : "",
            calc : calcObserverTime,
            parameters : ["acceleration", "distance"],
            units : 
            {
                "seconds" : 1,
                "minutes" : 60,
                "hours" : 3600,
                "days" : 86400,
                "months" : 2629800,
                "years" : 31557600
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        traveler_time : 
        {
            lbl : "Traveler time elapsed during journey",
            value : "",
            calc : calcTotalTravelerTime,
            parameters : ["acceleration", "distance"],
            units : 
            {
                "seconds" : 1,
                "minutes" : 60,
                "hours" : 3600,
                "days" : 86400,
                "months" : 2629800,
                "years" : 31557600
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        spacecraft_mass :
        {
            lbl : "Spacecraft mass at launch",
            value : "",
            calc : null,
            units : 
            {
                "grams" : 0.001,
                "kilograms" : 1,
                "tons" : 1000
            },
            changed : false,
            set : false,
            primary : true,
            def_val : "2000000",
            help_text : true
        },
        energy : 
        {
            lbl : "Energy",
            value : "",
            calc : calcEnergy,
            parameters : ["max_velocity", "spacecraft_mass"],
            units : 
            {
                "joules" : 1,
                "btu" : 1055.055853,
                "kilowatthours" : 3599999.99712,
                "megajoules" : 1000000,
                "exajoules" : 1000000000000000000 
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        fuel_conversion_rate : 
        {
            lbl : "Fuel conversion rate",
            value : "",
            calc : calcFuelConversionRate,
            parameters : ["energy", "fuel_mass"],
            units :
            {
                "kg x m x m" : 1
            },
            ajaxValues : "fuelrates",
            changed : false,
            set : false,
            primary : true,
            def_val : "0.008",
            help_text : true
        },
        fuel_mass : 
        {
            lbl : "Fuel mass",
            value : "",
            calc : calcFuelMass,
            parameters : ["energy", "fuel_conversion_rate"],
            units :
            {
                "kg" : 1,
                "tons" : 1000
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        traveler_length : 
        {
            lbl : "Length of spacecraft at start of journey",
            value : "",
            calc : calcTravelerLength,
            parameters : ["observer_length", "max_velocity"],
            units : 
            {
                "meters" : 1,
                "millimeters" : 1/100,
                "centimeters" : 1/10,
                "kilometers" : 1000
            },
            changed : false,
            set : false,
            primary : true,
            def_val : 1,
            help_text : true
        },
        observer_length : 
        {
            lbl : "Shortest length of spacecraft for observer",
            value : "",
            calc : calcMinObserverLength,
            parameters : ["traveler_length", "max_velocity"],
            units : 
            {
                "meters" : 1,
                "millimeters" : 1/100,
                "centimeters" : 1/10,
                "kilometers" : 1000
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        }
    };
    
    for (field in this.fields) {
        for (unit in this.fields[field].units) {
            if (this.fields[field].units[unit] == 1) {
                this.fields[field].current_unit = unit;
                break;
            }
        }
    }
    this.num_undefined = 0;
}