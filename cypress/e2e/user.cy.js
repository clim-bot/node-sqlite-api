const bcrypt = require('bcryptjs'); // Use bcryptjs in Cypress environment

describe('User Model Tests', () => {
  it('should create a new user with a hashed password', () => {
    const name = 'Test User';
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';

    // Use the createUser task to create a user via Sequelize
    cy.task('createUser', { name, email, password }).then((user) => {
      // Verify the user was created with the correct details
      expect(user.name).to.equal(name);
      expect(user.email).to.equal(email);
      expect(user.password).to.not.equal(password); // Password should be hashed

      // Query the hashed password from the database
      cy.task('queryDb', `SELECT password FROM Users WHERE email = '${email}'`).then((result) => {
        const storedPasswordHash = result[0].password;

        // Use bcryptjs to verify the stored password hash
        cy.wrap(null).then(() => {
          return bcrypt.compare(password, storedPasswordHash);
        }).then((isValid) => {
          expect(isValid).to.be.true; // Password should match the hash
        });
      });

      // Clean up: delete the user after the test
      cy.task('queryDb', `DELETE FROM Users WHERE email = '${email}'`);
    });
  });
});
