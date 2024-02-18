const { client } = require("../client/mongo");

/**
 * Validates user data.
 * @param {Object} userData The user data to validate.
 * @returns {Object} An object with two properties: isValid and errors.
 */
function validateUserData(userData) {
    const errors = [];
    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
        errors.push('Name is required and must be a string.');
    }

    if (!userData.email || typeof userData.email !== 'string' || !/^\S+@\S+\.\S+$/.test(userData.email)) {
        errors.push('A valid email is required.');
    }

    // Basic password validation: non-empty string. You might want to enforce more rules (length, complexity)
    if (!userData.password || typeof userData.password !== 'string' || userData.password.length < 6) {
        errors.push('Password is required and must be at least 6 characters long.');
    }

    // Optionally validate other fields (salt, iterations, accountType) based on your requirements

    return {
        isValid: errors.length === 0,
        errors,
    };
}

async function createUser(userData) {
    const validation = validateUserData(userData);
    if (!validation.isValid) {
        // Return or throw an error based on your application's error handling strategy
        return { success: false, errors: validation.errors };
    }

    const db = getDb();
    try {
        const result = await db.collection('users').insertOne(userData);
        return { success: true, userId: result.insertedId };
    } catch (error) {
        // Handle database errors (e.g., duplicate emails) based on your needs
        console.error('Error creating user:', error);
        return { success: false, errors: ['Failed to create user due to a server error.'] };
    }
}

// Usage example (make sure to handle the promise resolution/rejection properly in your code)
// createUser({ name: "John Doe", email: "invalidEmail", password: "123456" })
//   .then(result => console.log(result))
//   .catch(error => console.error(error));
