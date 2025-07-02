import loadEnv from './config/loadEnv.js';

loadEnv();

const { default: app } = await import('./app.js');

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});