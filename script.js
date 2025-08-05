let timesheet = JSON.parse(localStorage.getItem('timesheet')) || [];
let currentClockIn = null;

function clockIn() {
  if (currentClockIn !== null) {
    alert("Already clocked in!");
    return;
  }
  currentClockIn = new Date();
  alert(`Clocked in at ${currentClockIn.toLocaleTimeString()}`);
}

function clockOut() {
  if (currentClockIn === null) {
    alert("You need to clock in first.");
    return;
  }

  const clockOutTime = new Date();
  const hours = ((clockOutTime - currentClockIn) / 3600000).toFixed(2);

  timesheet.push({
    clockIn: currentClockIn.toLocaleString(),
    clockOut: clockOutTime.toLocaleString(),
    hours
  });

  currentClockIn = null;
  localStorage.setItem('timesheet', JSON.stringify(timesheet));
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("#timesheet tbody");
  tbody.innerHTML = "";

  timesheet.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.clockIn}</td>
      <td>${entry.clockOut}</td>
      <td>${entry.hours}</td>
    `;

    tbody.appendChild(row);
  });
}

renderTable();
