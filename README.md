# Running the API server

## Requirements
- Node.js and npm

## Steps
1. Clone the project using git 
2. Navigate to the project directory using your terminal
3. Run "npm i" to install dependencies
4. Start the server by running "nodemon" or "node server/app.js"

## Endpoints
- GET /assets
    - Description: Retrieves a list of cyber assets
    - Parameters:
        - type (optional): Filter assets by type
        - page (optional, defaults to 1): Page number for pagination
        - limit (optional, defaults to 10): Number of assets per page
    - Response:
        - data (array): List of cyber asset objects
        - page (integer): Current page number
        - limit (integer): Number of assets per page
- GET /assets/:id
    - Description: Retrieves a single cyber asset by ID
    - Parameters:
        - id (required): Cyber asset ID
    - Response:
        - asset (object): Cyber asset object
- POST /assets
    - Description: Creates a new cyber asset
    - Request body:
        - name (required): Name of the cyber asset
        - type (required): Type of the asset (ex: networking equipment, servers, etc.)
        - serial_number (required): Unique serial number of the asset
        - operating_system (required): Operating system of the asset
    - Response:
        - message (string): Success message indicating the asset was created
- PUT /assets/:id
    - Description: Updates an existing cyber asset
    - Parameters:
        - id (required): Cyber asset ID
    Request body:
        - Any combination of the following fields
            - name
            - type
            - serial_number
            - operating_system
    Response:
        - message (string): Success message indicating the asset was updated
- DELETE /assets/:id
    - Description: Deletes a cyber asset
    - Parameters:
        - id (required): Cyber asset ID
    - Response:
        - message (string): Success message indicating the asset was deleted