import * as functions from 'firebase-functions';
import * as express from 'express';
import { db } from './config/firebase';
import { doc, runTransaction, collection, getDocs } from 'firebase/firestore'; 
import { Documento } from './documents/doc';

const app = express();

app.get("", async(req,res) => {
  const newDocRef = doc(db, "students", "471i66MXM4WPeUY345Lo");
  try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(newDocRef);
        if (!sfDoc.exists()) {
            return res.status(404).send("Documento Não Encontrado")          
          }
        else{
          const data = sfDoc.data();
          const programsRef = collection(db, "students", data.id, "programs"); 
          const programsSnap = await getDocs(programsRef);
          const programsData = programsSnap.docs.map(doc => doc.data());
          data.program = programsData;
          Documento(data)
          return res.status(200).send(data);
        }
      });
    } catch (error) {
      return res.status(500).send("Mensagem de Erro: " + error)
    }
    return res.send("Finalizado o GET com error indefinido");
});

exports.app = functions.https.onRequest(app);
