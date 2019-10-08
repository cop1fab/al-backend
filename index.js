import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/index';

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

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
