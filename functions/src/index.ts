import * as functions from 'firebase-functions';
import * as express from 'express';
import { db } from './config/firebase';
import { doc, runTransaction } from 'firebase/firestore';

const app = express();

app.get("/:id", async(req,res) => {
  const newDocRef = doc(db, "Pacientes", req.params.id);
  try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(newDocRef);
        if (!sfDoc.exists()) {
          throw "Documento não existe!";
          
          }
        else{
          return res.send("aaaa" + {data : sfDoc.data});
          }
      });
      console.log("Transação Completa!");
    } catch (e) {
      console.log("Transação falhou: ", e);
    }

  return res.send("finalizado o get com sucesso ")
});

exports.app = functions.https.onRequest(app);
