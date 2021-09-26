import app from './app';

const PORT = 8081;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${PORT}`);
});
