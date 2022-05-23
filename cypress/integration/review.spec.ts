describe("review", () => {
  it("user can add a product review", () => {
    cy.visit("http://localhost:3000/");
    cy.findByRole("link", {
      name: /product \$ 71\.00 product description/i,
    }).click();
    let reviews = 0;
    cy.findAllByRole("heading", { name: /review/i }).then(($reviews) => {
      reviews = $reviews.length;
    });
    cy.findByRole("button", { name: /add a review/i }).click();
    cy.findByRole("textbox").type("This is a test review");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("textbox").should("not.exist");
    cy.findAllByRole("heading", { name: /review/i }).then(($reviews) => {
      expect($reviews.length).to.equal(reviews + 1);
    });
  });
});

export {};
