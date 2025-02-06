# Number Classification API

## Overview
This is a simple Express.js API that classifies numbers based on their mathematical properties. It determines whether a number is:
- **Prime**
- **Perfect**
- **Armstrong**
- **Even/Odd**
- **Sum of Digits**

Additionally, it fetches an interesting mathematical fact about the number from [Numbers API](http://numbersapi.com/).

## Features
- Classifies a number based on mathematical properties.
- Fetches a fun mathematical fact about the number.
- Uses **CORS** for cross-origin requests.
- Uses **compression** for better performance.

## Installation

### Prerequisites
- **Node.js** (>= 14.x recommended)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/number-classification-api.git
   cd number-classification-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The server will start on **http://localhost:3000** (or the port specified in the `PORT` environment variable).

## API Endpoints

### `GET /api/classify-number`

#### Description
Classifies a given number and returns various mathematical properties.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number`  | int  | Yes      | The number to classify |


#### Response Format:
- **Success (200 OK)**
```json
{
  "number": 7,
  "is_prime": true,
  "is_perfect": false,
  "properties": ["odd"],
  "digit_sum": 7,
  "fun_fact": "7 is the number of colors in a rainbow."
}
```

- **Error (400 Bad Request)**
```json
{
  "number": "alphabet",
  "error": true
}
```

#### Example Usage
```sh
curl "https://hngi12-backend-1.vercel.app/api/classify-number?number=28"
```

## Project Structure
```
number-classification-api/
│── node_modules/
│── package.json
│── package-lock.json
│── index.js (Main API file)
│── README.md (This file)
```

## Technologies Used
- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **CORS** (Cross-Origin Resource Sharing)
- **Compression** (Performance optimization)
- **Numbers API** (For fun number facts)

## License
This project is licensed under the **MIT License**.

## Author
Developed by [Favour Solomon (Soar)](https://github.com/your-github).