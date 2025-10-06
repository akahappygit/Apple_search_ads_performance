## Apple Search Ads Performance — Frontend

Short, interactive guide to run and explore.

### Run locally
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000`.

### Explore
- Dashboard KPIs and charts are under `src/features/dashboard` and `src/components/charts`.
- Filters live in `src/features/filters`.
- API mocks are in `src/app/api` and `src/data/mock-data.ts`.

### Strip comments (repo maintenance)
```bash
npm run strip:comments
```

### Build
```bash
npm run build && npm start
```

### Tech
- Next.js App Router, React, Tailwind CSS
- TanStack Query, Redux Toolkit, Recharts
