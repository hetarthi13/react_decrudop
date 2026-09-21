# React CRUD Operations

A responsive front-end web application built with **React** to perform full CRUD (Create, Read, Update, Delete) operations. This project demonstrates state management, component architecture, form handling, and interactive UI design for managing dynamic user data.

---

## Features

- **Create:** Add new user records with validated input forms.
- **Read:** Display all records dynamically in a clear, structured layout or table.
- **Update:** Edit existing entries seamlessly in real time.
- **Delete:** Remove records instantly with state synchronization.
- **State Management:** Uses centralized state management (Redux Toolkit / React Context / Hooks) for predictable data flow.

---

## Tech Stack

- **Frontend Library:** [React.js](https://reactjs.org/)
- **State Management:** Redux Toolkit / React Hooks (`useState`, `useReducer`)
- **Styling:** CSS3 / Bootstrap / Tailwind CSS
- **HTTP Client:** Axios / Fetch API (for REST API integration)

---

## Project Structure

```text
react_decrudop/
├── public/
│   └── index.html
└── src/
    ├── app/
    │   └── store.js          # Redux Store Configuration (if applicable)
    ├── components/
    │   ├── UserForm.jsx      # Form for Create & Edit operations
    │   ├── UserList.jsx      # Component to display records
    │   └── Navbar.jsx        # Navigation component
    ├── features/
    │   └── userSlice.js      # Redux slice / State logic
    ├── App.jsx               # Main container component
    ├── index.js              # Application entry point
    └── App.css               # Styling
