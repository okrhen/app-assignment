# Assignment

This is an assignment application.

---

**NOTE**

This application is developed and considered only to run in mobile devices screen, so please do not expect that it has a better view on large devices. To get the best experience please inspect and/or resize the app to a mobile view.

---

# Get Started

Lets start...

### Clone the app

```
git clone https://github.com/okrhen/app-assignment.git
```

### Config

create `.env.local` inside the root folder and paste this

```
REACT_APP_BASE_URL='https://green-thumb-64168.uc.r.appspot.com'
```

### Running the app

```
yarn install && yarn start
```

### Running test

```
yarn cypress:open
```

# File Structure

- `/src`
  - `/api`
  - `/components`
  - `/hooks`
  - `/locales`
  - `/navigation`
  - `/pages`
  - `/store`

# Libraries

- [TailwindCss](https://tailwindcss.com/)
  - `a css utility to speedup styling`
- [Reach Router](https://reach.tech/router/)
  - `for page routing and this is the future of react router`
- [date-fns](https://date-fns.org/)
  - `for date formatting`
- [cypress](https://www.cypress.io/)
  - `testing library`
