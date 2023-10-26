import * as functions from 'firebase-functions';
import * as express from 'express';
import { db } from './config/firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { Documento } from './documents/doc';
import { Packer } from 'docx';


const app = express();

app.get("/:id", async(req,res) => {
    const newDocRef = doc(db, "Pacientes", req.params.id);
    try {
        await runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(newDocRef);
          if (!sfDoc.exists()) {
              return res.status(404).send("Documento Não Encontrado")
            }
          else{
            const data = sfDoc.data();
            const documen = Documento(data);
            const blob = Packer.toBlob(documen)
            return res.status(200).send(blob);
          }
        });
      } catch (error) {
        return res.status(500).send("Mensagem de Erro: " + error)
      }
      return res.send("Finalizado o GET com error indefinido");
  });

exports.app = functions.https.onRequest(app);