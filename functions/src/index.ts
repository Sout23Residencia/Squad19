import * as functions from 'firebase-functions';
import * as express from 'express';
import { db } from './config/firebase';

const app = express();

app.get('/api/:id', (req, res) => {
  const docRef = db.collection('Pacientes').doc(req.params.id);

  docRef.get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      console.log(data);
    } else {
      console.log('Documento não encontrado');
    }
  })
  .catch((error) => {
    console.log('Erro ao obter documento:', error);
  });
});
exports.app = functions.https.onRequest(app);
