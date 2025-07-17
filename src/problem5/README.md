# CRUD Documentation

## App Structure

The `crud app` is organized as follows:

```
src/
├── server.js   # App entrypoint
├── app.js      # Express App
├── common/
│   ├── middleware/
│   │   └── validator.js  # Validate input
│   ├── helpers/
│   │   └── index.js      # Helper functions
│   ├── types/
│   │   └── index.js       # Shard types
├── modules/
│   ├── controllers/
│   │   └── profileController.js  # Handles business logic for profile APIs
│   ├── routes/
│   │   └── profileRoutes.js      # Defines API endpoints for profile module
│   ├── dtos/
│   │   └── dto.js       # Defines the data schema for profiles
│   ├── services/
│   │   └── profileService.js     # Contains reusable logic for profile operations
│   ├── repositories/
│   │   └── profileRepository.js         # Utility functions for interaction with db
```

## Setup

### Normal setup

```
- yarn install
- update .env file
- npx prisma migrate deploy
- npx prisma generate
- yarn dev
```

### With Docker

```
- update .env file
- docker-compose up
- docker exec -it 99tech-be npx prisma migrate deploy
```

## API Endpoints

Below is a list of API endpoints for the `profile` module:

### 1. **Get List Profile**

- **Endpoint**: `GET /profile`
- **Description**: Retrieves the list profils.
- **Query**:
  - `limit` (number)
  - `page` (number)
  - `name` (string): search for name
  - `isVerified` (boolean): filter isVerified

```
curl --location 'http://localhost:3000/profiles?isVerified=false&name=test'
```

### 2. **Get Profile**

- **Endpoint**: `GET /profile/:id`
- **Description**: Retrieves the profile details of a specific user.
- **Parameters**:
  - `id` (path): The ID of the user.

```
curl --location 'http://localhost:3000/profiles?isVerified=false&name=test'
```

### 3. **Create Profile**

- **Endpoint**: `POST /profile`
- **Description**: Creates a new user profile.
- **Body**:
  - `name` (string): The name of the user.
  - `dob` (date): The email address of the user.

```
curl --location 'http://localhost:3000/profiles' \
--header 'Content-Type: application/json' \
--data '{
    "name": "test 2",
    "dob": "1999-04-12T00:00:00.000Z"
}'
```

### 4. **Update Profile**

- **Endpoint**: `PUT /profile/:id`
- **Description**: Updates the profile details of a specific user.
- **Parameters**:
  - `id` (path): The ID of the user.
- **Body**:
  - `name` (string, optional): The updated name of the user.
  - `dob` (date, optional): The updated dob of the user.
  - `isVerified` (boolean, optional): The updated verification of the user.

```
curl --location --request PUT 'http://localhost:3000/profiles/3' \
--header 'Content-Type: application/json' \
--data '{
    "name": "test 1 update",
    "dob": "1999-04-12T00:00:00.000Z",
    "isVerified": true
}'
```

### 5. **Delete Profile**

- **Endpoint**: `DELETE /profile/:id`
- **Description**: Deletes the profile of a specific user.
- **Parameters**:
  - `id` (path): The ID of the user.
```
curl --location --request DELETE 'http://localhost:3000/profiles/2' \
--header 'Content-Type: application/json' \
--data '{
    "name": "test 1 update",
    "dob": "1999-04-12T00:00:00.000Z",
    "isVerified": true
}'
```
