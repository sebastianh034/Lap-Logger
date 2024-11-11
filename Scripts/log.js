const apiUrl = window.location.protocol === 'file:'
  ? 'http://localhost:8080' // Local API server during development
  : ''; // Production API

document.addEventListener('DOMContentLoaded', () => {
    const timeInput = document.getElementById('time');
    timeInput.addEventListener('blur', () => {
        const formattedTime = getFormattedTime(timeInput.value);
        if (formattedTime && timeInput.value !== formattedTime) {
            timeInput.value = formattedTime; // Set the formatted time
        }
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally

        const data = {
            name: document.getElementById('name').value || '',
            track: document.getElementById('track').value || '',
            car: document.getElementById('car').value || '',
            time: document.getElementById('time').value || '',
            number: document.getElementById('number').value || '',
            top_speed: document.getElementById('top-speed').value || '',
            comments: document.getElementById('comments').value || ''
        };

        // Basic validation
        if (!data.track || !data.car || !data.time) {
            alert('Please fill out the track, car, and time fields.');
            return;
        }

        // This is where you add the fetch call to send data to the server
        fetch('/save-data', { // fetches must change for when deploying
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // The data being sent
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            console.log('Data saved:', result);
            alert('Data saved successfully!');
            form.reset(); // Clear form fields after submission
        })
        .catch(error => {
            console.error('Error saving data:', error);
            alert('Error saving data: ' + error.message);
        });
    });
});

// Function to format time
function getFormattedTime(input) {
    const normalizedInput = input.replace(/[^0-9:]+/g, ':');
    const mmssPattern = /^(\d{1,2}):([0-5]?\d)$/;
    const hhmmssPattern = /^(\d{1,2}):([0-5]?\d):([0-5]?\d)$/;

    if (mmssPattern.test(normalizedInput)) {
        const [minutes, seconds] = normalizedInput.split(':');
        return `00:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    if (hhmmssPattern.test(normalizedInput)) {
        let [hours, minutes, seconds] = normalizedInput.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    return null;
}

//
// const apiUrl = window.location.protocol === 'file:'
//     ?'http://localhost:8080'
//     :''// // Loca