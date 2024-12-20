Here’s a sample **README.md** file for your project based on the steps you provided:

---

# Signup-Login App

## Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/Suhani8787/Signup-Login.git
cd Signup-Login
```

### 2. **Backend Setup**

1. Navigate to the **backend** folder.

```bash
cd backend
```

2. Install the required dependencies.

```bash
npm install
```

3. Change the **MongoDB connection string** in the `.env` file to your own MongoDB connection string. Locate the line with `MONGO_URI` and update it.

```bash
MONGO_URI=<your_connection_string>
```

### 3. **Frontend Setup**

1. Navigate to the **frontend** folder.

```bash
cd frontend
```

2. Install the required dependencies.

```bash
npm install
```

3. Change the IP address in **LoginScreen.tsx** and **SignUpScreen.tsx** to your own local IP address. Locate the following lines and update them with your IP address:

```tsx
const response = await axios.post('http://<your-ip>:5003/api/auth/login', { email, password });
```
and
```tsx
const response = await axios.post('http://<your-ip>:5003/api/auth/signup', {
    email,
    password,
});
```

### 4. **Run the Backend**

1. Navigate to the **backend** folder and start the server.

```bash
npm start
```

This will start the backend server at `http://localhost:5003`.

### 5. **Run the Frontend**

1. Navigate to the **frontend** folder and start the application.

```bash
npm start
```

## Additional Information

- **Backend**: The backend is built with Node.js and Express. It uses MongoDB for storing user data.
- **Frontend**: The frontend is built with React Native. It communicates with the backend via API requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Make sure to replace `<your_connection_string>` with the actual MongoDB connection string and `<your-ip>` with your local IP address. Let me know if you need further adjustments!
