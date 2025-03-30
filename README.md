# Teacher-Student API

## Hosted API
Live URL: https://teacher-api-production.up.railway.app

## Running Locally
### 1. Clone the repository

```bash
git clone https://github.com/shortlion99/teacher-api.git
cd teacher-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Then edit .env with your DB credentials

### 4. Database Setup

To create the database and required tables, run the following from the MySQL CLI:

```bash
mysql -u root -p < database-setup.sql
```

### 5. Start the server
```bash
npm run dev
```

API should be running at: http://localhost:3000