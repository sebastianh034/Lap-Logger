document.addEventListener("DOMContentLoaded", function() {
    // Hard-coded user name for filtering and displaying
    const userName = "sebastian hernandez";

    // Set welcome message
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${userName}!`;

    // Fetch the track times data
    fetch("http://localhost:5000/get-data") // Adjust URL as needed
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            const tableBody = document.querySelector("#track-times-table tbody");
            tableBody.innerHTML = "";

            // Filter and display only the track times that match the user's name
            responseData.times
                .filter(trackTime => trackTime.name === userName)
                .forEach(trackTime => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td data-key="name">${trackTime.name || ''}</td>
                        <td data-key="track">${trackTime.track || ''}</td>
                        <td data-key="car">${trackTime.car || ''}</td>
                        <td data-key="time">${trackTime.time || ''}</td>
                        <td data-key="number">${trackTime.number || ''}</td>
                        <td data-key="top_speed">${trackTime.top_speed || ''}</td>
                        <td data-key="comments">${trackTime.comments || ''}</td>
                    `;

                    // Create the action cell with an Edit button
                    const actionCell = document.createElement("td");
                    const editButton = document.createElement("button");
                    editButton.textContent = "Edit";
                    editButton.addEventListener("click", () => enableEdit(row, trackTime.id));
                    actionCell.appendChild(editButton);
                    row.appendChild(actionCell);

                    tableBody.appendChild(row);
                });
        })
        .catch(error => {
            console.error('Error fetching track times:', error);
        });
}); // Ensure this brace matches the `DOMContentLoaded` listener

function enableEdit(row, id) {
    // Make cells in the row editable
    Array.from(row.children).forEach(cell => {
        const key = cell.getAttribute("data-key");
        if (key) {
            const input = document.createElement("input");
            input.type = "text";
            input.value = cell.textContent;
            cell.innerHTML = ""; // Clear the cell's text
            cell.appendChild(input);
        }
    });

    // Change the button to "Save" after enabling edit mode
    const actionCell = row.lastElementChild;
    actionCell.innerHTML = ""; // Clear current action cell content
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => saveEdit(row, id));
    actionCell.appendChild(saveButton);

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteEntry(id, row));
    actionCell.appendChild(deleteButton);
}

function saveEdit(row, id) {
    // Gather edited data from the row
    const updatedData = {};
    Array.from(row.children).forEach(cell => {
        const input = cell.querySelector("input");
        if (input) {
            const key = cell.getAttribute("data-key");
            updatedData[key] = input.value;
        }
    });

    // Send updated data to the server
    fetch(`http://localhost:5000/update-data/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message); // Display success message
        location.reload(); // Refresh the page to see the updated data
    })
    .catch(error => {
        console.error('Error updating data:', error);
    });
}

function deleteEntry(id, row) {
    // Confirm deletion
    if (confirm("Are you sure you want to delete this entry?")) {
        // Send DELETE request to the server
        fetch(`http://localhost:5000/delete-data/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message); // Display success message
            row.remove(); // Remove the row from the table
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        });

}}