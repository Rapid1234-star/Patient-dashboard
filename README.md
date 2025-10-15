# Jarurat Care — Patient Records Dashboard

An interactive React app to manage and explore patient records. Built with Vite, React Router, and plain CSS. Simple, fast, and responsive.

## Quick Start

Prerequisites: Node.js 18+

```bash
cd patient-dashboard
npm install
npm run dev
```

Open `http://localhost:5173/` and use the navbar to navigate.

## Try It Out (Interactive Walkthrough)

1) Navigate pages
- Click `Home`, `Patients`, and `About` in the header.

2) Search patients
- Go to `Patients` and type a name (e.g., `Leanne`, `Ervin`) in the search bar.
- Cards filter in real time.

3) View details in a modal
- Click `View Details` on any patient card.
- Close via the `×` button or press `Esc`.

4) Add a new patient
- Click `Add New Patient` on the Patients page.
- Fill the form and submit — a new card appears at the top.

5) Loading and error states
- The app shows a loading message during data fetch.
- To simulate an error, toggle your browser DevTools Network to `Offline` and reload; an error banner will appear.

## Features

- Responsive card/grid layout for patient list (Name, Age, Contact)
- Search by name with instant filtering
- Details modal with email, address, company
- Add New Patient with local state (no backend)
- Loading and error messaging for the fetch lifecycle

## Tech Stack

- React + Vite
- React Router (`react-router-dom`)
- CSS (no frameworks; easy to swap for Tailwind/Bootstrap if desired)

## Project Structure

```
patient-dashboard/
├── src/
│   ├── main.jsx                # Router setup
│   ├── App.jsx                 # Layout + Routes
│   ├── App.css                 # Global styles (navbar, grid, modal, forms)
│   ├── components/
│   │   ├── Navbar.jsx          # Header + navigation
│   │   ├── Modal.jsx           # Reusable modal
│   │   └── PatientCard.jsx     # Patient summary card
│   └── pages/
│       ├── Home.jsx            # Landing page
│       ├── Patients.jsx        # Fetch, search, modals, add patient
│       └── About.jsx           # About page
└── package.json
```

## Data Source

- Uses `https://jsonplaceholder.typicode.com/users` to fetch demo users.
- `age` is synthesized since the API doesn’t include it.

To point to a different source, update the `fetch` URL in `src/pages/Patients.jsx`.

## Build & Preview

```bash
npm run build
npm run preview
```

## Accessibility

- Modal closes on `Esc`.
- Buttons and inputs have clear focus and labels.

## Troubleshooting

- Port busy? Run `npm run dev -- --port 5174` and open `http://localhost:5174/`.
- Node version: ensure Node 18+ for Vite 7.
- If the list is empty, check your network or API availability.

## Notes

- React Compiler is not enabled by default. See the official docs if you plan to enable it for production workflows.
