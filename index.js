import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server started successfully on ${port}`);
});

export default app;
