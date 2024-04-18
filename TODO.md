# Reflection

- If given more time, I would:
    - Add search functionality, allowing searching assets by different criteria (name, serial_number)
    - Add more filtering by additional fields. Currently only have type, but could add operating system and created_at/updated_at
    - Add sorting functionality, allowing assets to be sorted by various fields (created_at/updated_at)

- To make the API more secure, I would:
    - Add authentication based on user roles, giving specific permissions to specific users
        - Maybe some users can view all cyber assets, but only some can create/update/delete them
    - Add middleware to ensure that certain endpoints are only being used by the appropriate users
    - Use CORS to only allow requests from approved urls

- If the database was intended to hold a lot of data, I would consider using a different database solution like PostgreSQL

- To make the project more portable, I would:
    - Use Docker to ensure that the environment is always the same and no unexpected errors come up
    - If using a different DB like PostgreSQL, add environment variables to ensure keys are safe and allow for easier deployment across different environments

- Additional notes:
    - If this were a real world application I would implement unit tests as well to ensure all API endpoints are working as expected