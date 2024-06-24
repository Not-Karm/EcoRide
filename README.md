# EcoRide

EcoRide is a website designed to foster sustainable commuting practices by connecting individuals traveling to the same workplace, school, or college within a specific geographic area. Our platform allows users to input their daily commute details, including origin (home location area) and destination (workplace, school, or college). EcoRide then efficiently matches individuals with similar commute routes and time schedules, promoting carpooling and reducing environmental impact.

## Features

* Users can easily input their daily commuting details.
* EcoRide efficiently matches individuals with similar commute routes and time schedules.
* The platform promotes sustainable commuting by encouraging carpooling.


## Installation

**1. Clone the Repository:**

```bash
git clone https://github.com/Not-Karm/EcoRide.git
cd EcoRide
```
2. Install Dependencies:
```
npm install
```
3. Database Setup:

Ensure you have the commute.db SQLite database file present in the project directory.

## Usage

1. Start the Server:
```
node app.js
```
2. Access the Application:

Open your web browser and navigate to the application at **localhost:3000**

## Endpoints

The following API endpoints are available:

* `GET /allRecords`: Retrieves all user records.
* `GET /record/:id`: Retrieves a specific user record by ID.
* `PUT /update/:id`: Updates a specific user record by ID.
* `DELETE /delete/:id`: Deletes a specific user record by ID.
* `GET /search/:locality/:destination`: Searches for user records based on locality and destination.
* `GET /countRecords`: Retrieves the total number of user records.
* `GET /uniqueLocalities`: Retrieves a list of unique user localities.
* `GET /uniqueDestinations`: Retrieves a list of unique user destinations.

For any inquiries, please reach out at karmrajput13@gmail.com
