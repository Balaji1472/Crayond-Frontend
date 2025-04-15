# 🚀 StartupBuddy Frontend

This is the **Frontend** of the **StartupBuddy** chatbot, built with **Next.js** and deployed on **Vercel**. It communicates with the backend via REST APIs to handle chat functionality and present responses in a clean UI.

---

## 💠 Tech Stack

- **Next.js** – React framework for server-side rendering and static site generation  
- **CSS** – For custom styling and layout  
- **JavaScript** - Used for scripting  
- **Vercel** – For fast and easy frontend deployment  

---

## 📁 Project Structure

```
startupbuddy-frontend/
│
├── public/                 # Static assets
├── src/                    # App logic and components
│   └── ...                 # Custom components and pages
├── .gitignore              # Git ignored files
├── eslint.config.mjs       # ESLint configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project metadata and scripts
├── package-lock.json       # Dependency lock file
├── README.md               # Project documentation (this file)
├── test.html               # Test HTML file (if needed)
└── tsconfig.json           # TypeScript config (optional)
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Balaji1472/Crayond-frontend.git
cd startupbuddy-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env.local` file to store environment variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-api-url.onrender.com
```

> Replace with your actual backend Render URL.

---

## 🚀 Run Locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🌐 Deployment (Vercel)

The frontend is deployed on **Vercel**. To deploy:

1. Push your code to GitHub
2. Visit [https://vercel.com](https://vercel.com) and import the repo
3. Add environment variable `NEXT_PUBLIC_API_URL`
4. Deploy the project

---

## ✨ Features

- Chat interface to interact with the chatbot
- Dynamic messages rendering
- API status indicator
- Smooth UI with Tailwind styling

---

## 📃 Scripts

| Script       | Description                |
|--------------|----------------------------|
| `dev`        | Runs development server    |
| `build`      | Builds the application     |
| `start`      | Starts production server   |
| `lint`       | Runs ESLint checks         |

Run using:
```bash
npm run <script>
```

---

## 📆 Dependencies

```
next
react
react-dom
tailwindcss
postcss
autoprefixer
```

Add others as needed based on your actual `package.json`.

---

## 👨‍💼 Author

Developed by [Balaji V]  
If you found this useful, star the repo and share your feedback!

