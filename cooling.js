// Function to calculate subcooling for R-410A refrigerant
function calculateSubcooling(liquidLineTemperature, liquidLinePressure) {
    // Using R-410A refrigerant pressure-temperature chart
    // Here we assume liquidLinePressure is in PSIG (pounds per square inch gauge)
    // and liquidLineTemperature is in Fahrenheit

    // Lookup corresponding saturation temperature for given pressure
    var saturationTemperature = {
        50: 1.6,
        60: 8.8,
        70: 15.2,
        80: 21.1,
        90: 26.6,
        100: 31.6,
        110: 36.3,
        120: 40.8,
        130: 45.0,
        140: 49,
        150: 52.8,
        160: 56.4,
        170: 59.9,
        180: 63.2,
        190: 66.4,
        200: 69.5,
        210: 72.5,
        220: 75.4,
        230: 78.2,
        240: 80.9,
        250: 83.6,
        260: 86.1,
        270: 88.6,
        280: 91.1,
        290: 93.5,
        300: 95.8,
        310: 98.1,
        320: 100.3,
        330: 102.5,
        340: 104.6,
        350: 106.7,
        360: 108.7,
        370: 110.7,
        380: 112.7,
        390: 114.6,
        400: 116.5,
        410: 118.4,
        420: 120.2,
        430: 122,
        440: 123.8,
        450: 125.6,
        460: 127.3,
        470: 129,
        480: 130.6,
        490: 132.3,
        500: 133.9,
        510: 135.5,
        520: 137.1,
        530: 138.7,
        540: 140.2,
        550: 141.7,
        560: 143.2
    };

    // Find the closest pressure from the table
    var closestPressure = Object.keys(saturationTemperature).reduce(function(prev, curr) {
        return Math.abs(curr - liquidLinePressure) < Math.abs(prev - liquidLinePressure) ? curr : prev;
    });

    // Get the saturation temperature for the closest pressure
    var saturationTemp = saturationTemperature[closestPressure];

    // Calculate subcooling
    var subcooling = saturationTemp - liquidLineTemperature;

    return subcooling;
}

// Function to calculate superheat for R-410A refrigerant
function calculateSuperheat(suctionLineTemperature, suctionLinePressure) {
    // Using R-410A refrigerant pressure-temperature chart
    // Here we assume suctionLinePressure is in PSIG (pounds per square inch gauge)
    // and suctionLineTemperature is in Fahrenheit

    // Lookup corresponding saturation temperature for given pressure
    var saturationTemperature = {
        50: 1.6,
        60: 8.8,
        70: 15.2,
        80: 21.1,
        90: 26.6,
        100: 31.6,
        110: 36.3,
        120: 40.8,
        130: 45.0,
        140: 49,
        150: 52.8,
        160: 56.4,
        170: 59.9,
        180: 63.2,
        190: 66.4,
        200: 69.5,
        210: 72.5,
        220: 75.4,
        230: 78.2,
        240: 80.9,
        250: 83.6,
        260: 86.1,
        270: 88.6,
        280: 91.1,
        290: 93.5,
        300: 95.8,
        310: 98.1,
        320: 100.3,
        330: 102.5,
        340: 104.6,
        350: 106.7,
        360: 108.7,
        370: 110.7,
        380: 112.7,
        390: 114.6,
        400: 116.5,
        410: 118.4,
        420: 120.2,
        430: 122,
        440: 123.8,
        450: 125.6,
        460: 127.3,
        470: 129,
        480: 130.6,
        490: 132.3,
        500: 133.9,
        510: 135.5,
        520: 137.1,
        530: 138.7,
        540: 140.2,
        550: 141.7,
        560: 143.2
    };

    // Find the closest pressure from the table
    var closestPressure = Object.keys(saturationTemperature).reduce(function(prev, curr) {
        return Math.abs(curr - suctionLinePressure) < Math.abs(prev - suctionLinePressure) ? curr : prev;
    });

    // Get the saturation temperature for the closest pressure
    var saturationTemp = saturationTemperature[closestPressure];

    // Calculate superheat
    var superheat = suctionLineTemperature - saturationTemp;

    return superheat;
}

// Function to display the comparison result
function displayComparisonResult(result) {
    var comparisonResultElement = document.getElementById("comparisonResult");
    comparisonResultElement.innerHTML = "<h2>Comparison Result</h2>";
    for (var parameter in result) {
        if (result.hasOwnProperty(parameter)) {
            var statusClass = result[parameter].status === "equal" ? "equal" : result[parameter].status === "high" ? "high" : "low";
            comparisonResultElement.innerHTML += `<p>${parameter}: Standard = ${result[parameter].standard}, User = ${result[parameter].user}, Status = <span class="${statusClass}">${result[parameter].status}</span>, Message = ${result[parameter].message}</p>`;
        }
    }
}

// Function to get a message based on parameter and status
function getMessage(parameter, status) {
    if (status === "high") {
        switch (parameter) {
            case "dischargePressure":
                return "High discharge pressure may indicate a blockage in the refrigerant line or a faulty compressor.";
            case "suctionPressure":
                return "High suction pressure may indicate a clogged air filter or a restriction in the refrigerant flow.";
            case "liquidLinePressure":
                return "High liquid line pressure may indicate a problem with the expansion valve or an overcharged system.";
            case "dischargeTemperature":
                return "High discharge temperature may indicate a problem with the compressor or overcharge of refrigerant.";
            case "suctionLineTemperature":
                return "High suction line temperature may indicate a problem with the refrigerant flow or an overcharge of refrigerant.";
            case "liquidLineTemperature":
                return "High liquid line temperature may indicate a problem with the refrigerant flow or an overcharge of refrigerant.";
            case "blowerAmps":
                return "High blower amps may indicate a problem with the blower motor or a restriction in the air ducts.";
            case "condenserFanAmps":
                return "High condenser fan amps may indicate a problem with the condenser fan motor or a restriction in airflow.";
            case "compressorAmps":
                return "High compressor amps may indicate a problem with the compressor or overcharge of refrigerant.";
            case "subcooling":
                return "High subcooling may indicate an overcharge of refrigerant or a problem with the expansion valve.";
            case "superheat":
                return "High superheat may indicate a problem with the refrigerant flow, low refrigerant charge, or a faulty expansion valve.";
            // Add messages for other parameters as needed
            default:
                return "";
        }
    } else if (status === "low") {
        switch (parameter) {
            case "dischargePressure":
                return "Low discharge pressure may indicate low refrigerant charge or a leaking refrigerant line.";
            case "suctionPressure":
                return "Low suction pressure may indicate a refrigerant leak or a problem with the compressor.";
            case "liquidLinePressure":
                return "Low liquid line pressure may indicate a restriction in the refrigerant flow or a problem with the expansion valve.";
            case "dischargeTemperature":
                return "Low discharge temperature may indicate low refrigerant charge or a problem with the compressor.";
            case "suctionLineTemperature":
                return "Low suction line temperature may indicate a problem with the refrigerant flow or a low refrigerant charge.";
            case "liquidLineTemperature":
                return "Low liquid line temperature may indicate a problem with the refrigerant flow or low refrigerant charge.";
            case "blowerAmps":
                return "Low blower amps may indicate a problem with the blower motor or a restricted air filter.";
            case "condenserFanAmps":
                return "Low condenser fan amps may indicate a problem with the condenser fan motor or a restricted airflow.";
            case "compressorAmps":
                return "Low compressor amps may indicate a problem with the compressor or low refrigerant charge.";
            case "subcooling":
                return "Low subcooling may indicate a low charge of refrigerant, a problem with the expansion valve, or insufficient airflow over the condenser coil.";
            case "superheat":
                return "Low superheat may indicate a problem with the refrigerant flow, excess refrigerant charge, or a faulty expansion valve.";
            // Add messages for other parameters as needed
            default:
                return "";
        }
    } else {
        return "The parameter is within the standard range.";
    }
}

// Function to handle form submission
document.getElementById("coolingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    var dischargePressure = parseFloat(document.getElementById("dischargePressure").value);
    var suctionPressure = parseFloat(document.getElementById("suctionPressure").value);
    var liquidLinePressure = parseFloat(document.getElementById("liquidLinePressure").value);
    var dischargeTemperature = parseFloat(document.getElementById("dischargeTemperature").value);
    var suctionLineTemperature = parseFloat(document.getElementById("suctionLineTemperature").value);
    var liquidLineTemperature = parseFloat(document.getElementById("liquidLineTemperature").value);
    var blowerAmps = parseFloat(document.getElementById("blowerAmps").value);
    var condenserFanAmps = parseFloat(document.getElementById("condenserFanAmps").value);
    var compressorAmps = parseFloat(document.getElementById("compressorAmps").value);

    // Set standard values for comparison
    var standards = {
        dischargePressure: [300, 560],
        suctionPressure: [100, 145],
        liquidLinePressure: [300,560],
        dischargeTemperature: [150,190],
        suctionLineTemperature: [40,60],
        liquidLineTemperature: [85,120],
        blowerAmps: [5,11],
        condenserFanAmps: [3,5],
        compressorAmps: [20,50],
        subcooling: [10, 18],
        superheat: [14, 18]

    };

    // Compare user inputs with standards
    var comparisonResult = {};
    for (var parameter in standards) {
        if (standards.hasOwnProperty(parameter)) {
            var standardValue = standards[parameter];
            var userValue = eval(parameter); // Get the value of the corresponding variable
            var status = "equal";
            var message = "";

            if (Array.isArray(standardValue)) {
                if (userValue < standardValue[0]) {
                    status = "low";
                    message = getMessage(parameter, status);
                } else if (userValue > standardValue[1]) {
                    status = "high";
                    message = getMessage(parameter, status);
                }
            } else {
                if (userValue < standardValue) {
                    status = "low";
                    message = getMessage(parameter, status);
                } else if (userValue > standardValue) {
                    status = "high";
                    message = getMessage(parameter, status);
                }
            }

            comparisonResult[parameter] = {
                standard: Array.isArray(standardValue) ? `${standardValue[0]} to ${standardValue[1]}` : standardValue,
                user: userValue,
                status: status,
                message: message
            };
        }
    }

    // Calculate subcooling (assuming liquid line temperature is in Fahrenheit and liquid line pressure is in PSIG)
    var subcooling = calculateSubcooling(liquidLineTemperature, liquidLinePressure);
    var subcoolingStatus = subcooling >= 10 && subcooling <= 18 ? 'equal' : subcooling < 10 ? 'low' : 'high';

    comparisonResult['subcooling'] = {
        user: subcooling,
        status: subcoolingStatus,
        message: getMessage('subcooling', subcoolingStatus)
    };

    // Calculate superheat (assuming suction line temperature is in Fahrenheit and suction line pressure is in PSIG)
    var superheat = calculateSuperheat(suctionLineTemperature, suctionPressure);
    comparisonResult['superheat'] = {
        user: superheat,
        status: superheat >= 14 && superheat <= 18 ? 'equal' : superheat < 14 ? 'low' : 'high',
        message: getMessage('superheat', superheat >= 14 && superheat <= 18 ? 'equal' : superheat < 14 ? 'low' : 'high')
    };

    // Display comparison result
    displayComparisonResult(comparisonResult);

    // Close the modal
    closeFormModal();
});

// Get parameters from URL
var urlParams = new URLSearchParams(window.location.search);
var unitModel = urlParams.get("model");
var troubleshootingType = urlParams.get("type");

// Display parameters in the page
document.getElementById("unitModel").innerText = unitModel;
document.getElementById("troubleshootingType").innerText =
    troubleshootingType;
