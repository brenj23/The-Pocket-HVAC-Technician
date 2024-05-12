// Function to open the form modal

// Function to close the form modal
function closeFormModal() {
    document.getElementById("formModal").style.display = "none";
}

// Function to get a message based on parameter and status
function getMessage(parameter, status) {
    if (status === "high") {
        switch (parameter) {
            case "voltage":
                return "High voltage may indicate a problem with the electrical supply or equipment.";
            case "current":
                return "High current may indicate a problem with the heating element or control circuit.";
            case "temperature":
                return "High temperature may indicate overheating of the system or a faulty temperature sensor.";
            default:
                return "";
        }
    } else if (status === "low") {
        switch (parameter) {
            case "voltage":
                return "Low voltage may indicate a problem with the electrical supply or equipment.";
            case "current":
                return "Low current may indicate a problem with the heating element or control circuit.";
            case "temperature":
                return "Low temperature may indicate inadequate heating or a faulty temperature sensor.";
            default:
                return "";
        }
    } else {
        return "The parameter is within the standard range.";
    }
}

// Function to handle electric heat form submission
document.getElementById("heatingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    var voltage = parseFloat(document.getElementById("voltage").value);
    var current = parseFloat(document.getElementById("current").value);
    var temperature = parseFloat(document.getElementById("temperature").value);

    // Set standard values for electric heat comparison
    var heatStandards = {
        voltage: [460,480], // Typical voltage range for electric heating systems
        current: [50,64], // Typical current range for electric heating systems
        temperature: [0,100] // Typical temperature range for electric heating systems
    };

    // Compare user inputs with electric heat standards
    var heatComparisonResult = {};
    for (var parameter in heatStandards) {
        if (heatStandards.hasOwnProperty(parameter)) {
            var standardValue = heatStandards[parameter];
            var userValue = eval(parameter); // Get the value of the corresponding variable
            var status = "equal";
            var message = "";

            if (userValue < standardValue[0]) {
                status = "low";
                message = getMessage(parameter, status);
            } else if (userValue > standardValue[1]) {
                status = "high";
                message = getMessage(parameter, status);
            }

            heatComparisonResult[parameter] = {
                standard: `${standardValue[0]} to ${standardValue[1]}`,
                user: userValue,
                status: status,
                message: message
            };
        }
    }

    // Display electric heat comparison result
    displayHeatComparisonResult(heatComparisonResult);

    // Close the modal
    closeFormModal();
});

// Function to display the comparison result for electric heat troubleshooting
function displayHeatComparisonResult(result) {
    var comparisonResultElement = document.getElementById("heatComparisonResult");
    comparisonResultElement.innerHTML = "<h2>Heat Comparison Result</h2>";
    for (var parameter in result) {
        if (result.hasOwnProperty(parameter)) {
            var statusClass = result[parameter].status === "equal" ? "equal" : result[parameter].status === "high" ? "high" : "low";
            var statusMessage= "";
            if (result[parameter].status === "high" || result[parameter].status === "low") {
                statusMessage = getMessage(parameter, result[parameter].status);
            }
            comparisonResultElement.innerHTML += `<p>${parameter}: Standard = ${result[parameter].standard}, User = ${result[parameter].user}, Status = <span class="${statusClass}">${result[parameter].status}</span>, Message = ${result[parameter].message}</p>`;
        }
    }
}
