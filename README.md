
# Race Time Tracker API

A simple RESTful API built with Flask to manage race times for cars on different tracks. This API allows you to save, retrieve, update, and delete race data, which includes track details, car information, race times, and more.

## Setup and Installation

### Prerequisites
- **Python 3.7+**: Make sure Python is installed on your system.
- **SQLite**: The database used for storing race times.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize the database:
   ```bash
   python -c "from <script_name> import init_db; init_db()"
   ```
   *Replace `<script_name>` with the name of the Python file containing your Flask app, e.g., `app.py`.*

4. Run the server:
   ```bash
   python <script_name>.py
   ```
   The server will start on `http://localhost:5000`.

## Endpoints

### 1. **Save Data**
   - **Endpoint**: `/save-data`
   - **Method**: `POST`
   - **Description**: Save a new race record.
   - **Request Body** (JSON):
     ```json
     {
       "name": "Driver Name",
       "track": "Track Name",
       "car": "Car Model",
       "time": "00:02:15.67",
       "number": "Car Number",
       "top_speed": "220 km/h",
       "comments": "Notes or comments"
     }
     ```
   - **Response**:
     - `200 OK`: `{"message": "Data saved successfully!"}`
     - `400 Bad Request`: `{"error": "Missing required field: <field_name>"}` if any required field is missing.

### 2. **Retrieve Data**
   - **Endpoint**: `/get-data`
   - **Method**: `GET`
   - **Description**: Retrieve all race records.
   - **Response**:
     - `200 OK`: A JSON object containing all race times.
     ```json
     {
       "times": [
         {
           "id": 1,
           "name": "Driver Name",
           "track": "Track Name",
           "car": "Car Model",
           "time": "00:02:15.67",
           "number": "Car Number",
           "top_speed": "220 km/h",
           "comments": "Notes or comments"
         }
       ]
     }
     ```

### 3. **Update Data**
   - **Endpoint**: `/update-data/<id>`
   - **Method**: `PUT`
   - **Description**: Update an existing race record by its ID.
   - **URL Parameter**:
     - `<id>`: The ID of the race record to update.
   - **Request Body** (JSON):
     ```json
     {
       "name": "Updated Driver Name",
       "track": "Updated Track Name",
       "car": "Updated Car Model",
       "time": "00:02:30.00",
       "number": "Updated Car Number",
       "top_speed": "210 km/h",
       "comments": "Updated notes or comments"
     }
     ```
   - **Response**:
     - `200 OK`: `{"message": "Data updated successfully!"}`
     - `400 Bad Request`: `{"error": "Missing required field: <field_name>"}` if any required field is missing.

### 4. **Delete Data**
   - **Endpoint**: `/delete-data/<id>`
   - **Method**: `DELETE`
   - **Description**: Delete a specific race record by its ID.
   - **URL Parameter**:
     - `<id>`: The ID of the race record to delete.
   - **Response**:
     - `200 OK`: `{"message": "Data deleted successfully!"}`
     - `404 Not Found`: `{"error": "Record not found"}` if the record does not exist.

## Database Schema

The SQLite database has a single table called `times` with the following attributes:

| Attribute    | Type    | Description                                 |
|--------------|---------|---------------------------------------------|
| `id`         | INTEGER | Primary key, auto-incremented               |
| `name`       | TEXT    | Name of the driver                          |
| `track`      | TEXT    | Name of the track                           |
| `car`        | TEXT    | Model of the car                            |
| `time`       | TEXT    | Recorded race time                          |
| `number`     | TEXT    | Car number                                  |
| `top_speed`  | TEXT    | Top speed achieved                          |
| `comments`   | TEXT    | Additional notes or comments                |

## Example Usage

Below is an example using **curl** to test the `/save-data` endpoint:

```bash
curl -X POST http://localhost:5000/save-data -H "Content-Type: application/json" -d '{
  "name": "John Doe",
  "track": "Silverstone Circuit",
  "car": "Ferrari F8",
  "time": "01:25:43",
  "number": "23",
  "top_speed": "210 km/h",
  "comments": "Smooth race!"
}'
```

