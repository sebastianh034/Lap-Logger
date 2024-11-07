document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:5000/get-data") // Ensure the correct URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(responseData => {
            const tableBody = document.querySelector("#track-times-table tbody");
            tableBody.innerHTML = "";  // Clear existing rows

            // Loop through the data array within the response and create HTML rows for each item
            responseData.times.forEach(trackTime => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${trackTime.name || ''}</td>
                    <td>${trackTime.track || ''}</td>
                    <td>${trackTime.car || ''}</td>
                    <td>${trackTime.time || ''}</td>
                    <td>${trackTime.number || ''}</td>
                    <td>${trackTime.top_speed || ''}</td>
                    <td>${trackTime.comments || ''}</td>
                `;
                tableBody.appendChild(row);  // Add the row to the table
            });
        })
        .catch(error => {
            console.error('Error fetching track times:', error);
        });
});
