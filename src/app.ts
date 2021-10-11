import express from 'express';
import routes from './routes';

const PORT = 8081;

const app = express();
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${PORT}`);
});

export default app;
