// Function to start troubleshooting based on selected options
function startTroubleshooting() {
    var unitModel = document.getElementById("unitModel").value;
    var troubleshootingType = document.getElementById("troubleshootingType").value;

    if (troubleshootingType === "heating") {
        window.location.href = "heating.html?model=" + unitModel;
    } else if (troubleshootingType === "cooling") {
        window.location.href = "cooling.html?model=" + unitModel;
    }
}



// Function to open the form modal
function openFormModal() {
    document.getElementById("formModal").style.display = "block";
}

// Function to close the form modal
function closeFormModal() {
    document.getElementById("formModal").style.display = "none";
}

