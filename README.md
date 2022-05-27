This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Getting Started

- First, you'll need a [Stripe](https://stripe.com/en-br) test account created with a developers' _Publishable key_ and a _Secret key_. With these keys, create a `.env.local` file in the root of this repo. The `.env.local` content should look like the following:

  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<YOUR_PUBLISHABLE_KEY>
  STRIPE_SECRET_KEY=<YOUR_SECRET_KEY>
  ```

- Second, edit the line 1 of the file `utils/products-to-stripe.js`, adding the `STRIPE_SECRET_KEY` as the second argument, like the following:

  ```
  const stripe = require("stripe")("YOUR_SECRET_KEY");
  ```

  > :warning: **Remove the key prior to uploading this file to git**

  PS: this could be improved like passing the key as a parameter to the script.

- Third, open your terminal and with Node installed, run the following command:

  ```bash
  node utils/products-to-stripe.js
  ```

  This command will populate your recently created Stripe account with the products listed in the `utils/products-source.json` file.

- Run the development server:

  ```bash
  yarn dev
  ```

- Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Running tests

Unit tests with coverage report:

```bash
yarn test
```

Unit tests with watch mode:

```bash
yarn test:watch
```

End to end tests with headless mode (doesn't need to run the development server since the script runs with the lib _start-server-and-test_ responsible for that):

```bash
yarn cypress:run
```

End to end tests opening Cypress browser (doesn't need to run the development server since the script runs with the lib _start-server-and-test_ responsible for that - although it's necessary to manually start the tests in Cypress UI):

```bash
yarn cypress:open
```
