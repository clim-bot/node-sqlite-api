// Example of adding custom commands
Cypress.Commands.add('createUser', (username, email) => {
  const query = `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`;
  return cy.task('queryDb', query);
});
  
Cypress.Commands.add('deleteUser', (username) => {
  const query = `DELETE FROM users WHERE username = '${username}'`;
  return cy.task('queryDb', query);
});
  