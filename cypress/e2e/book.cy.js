describe('Book Model Tests', () => {
  let user;
  
  before(() => {
    // Step 1: Create a user before creating a book
    const userInfo = {
      name: 'Test User',
      email: `testuser_${Date.now()}@example.com`,
      password: 'password123',
    };
  
    // Use the createUser task to create a user via Sequelize
    cy.task('createUser', userInfo).then((createdUser) => {
      user = createdUser; // Store the created user for associating books
    });
  });
  
  it('should create a new book associated with a user', () => {
    const bookData = {
      title: 'Cypress Testing Book',
      author: 'Cypress Author',
      userId: user.id, // Associate the book with the created user
    };
  
    // Step 2: Create a book using the createBook task
    cy.task('createBook', bookData).then((book) => {
      expect(book.title).to.equal(bookData.title);
      expect(book.author).to.equal(bookData.author);
      expect(book.userId).to.equal(user.id); // Verify the book is associated with the correct user
    });
  
    // Step 3: Verify the book exists in the database
    cy.task('getBooks', { where: { title: bookData.title } }).then((books) => {
      expect(books).to.have.length(1); // Ensure one book is returned
      const book = books[0];
      expect(book.title).to.equal(bookData.title);
      expect(book.author).to.equal(bookData.author);
      expect(book.userId).to.equal(user.id);
    });
  });
  
  it('should delete a book by its title', () => {
    const bookTitle = 'Cypress Testing Book';
  
    // Step 4: Delete the book using its title
    cy.task('deleteBookByTitle', bookTitle).then((result) => {
      expect(result).to.equal(1); // Ensure one record was deleted
    });
  
    // Step 5: Verify the book no longer exists
    cy.task('getBooks', { where: { title: bookTitle } }).then((books) => {
      expect(books).to.have.length(0); // Ensure no books with the given title exist
    });
  });
});
  