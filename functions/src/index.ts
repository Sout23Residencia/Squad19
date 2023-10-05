import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.status(200).send('Enviado com sucesso'));



exports.app = functions.https.onRequest(app);
