import * as functions from 'firebase-functions';
import * as express from 'express';
import * as fs from 'fs';
import { db } from './config/firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { Documento } from './documents/doc';
import { Packer } from 'docx';


const app = express();

app.get("/:id", async(req,res) => {
  const newDocRef = doc(db, "students", req.params.id);
  try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(newDocRef);
        if (!sfDoc.exists()) {
            return res.status(404).send("Documento Não Encontrado")          
          }
        else{
          const data = sfDoc.data();
          const doc = Documento(data);
          const buffer = await Packer.toBuffer(doc);
          const fileName = "Teste.docx";
          
          fs.writeFile(fileName, buffer, (err) => {
            if (err) {
              return res.status(500).send("Erro ao salvar o arquivo");
            }
  
            res.setHeader("Content-Disposition", "attachment; filename=Teste.docx");
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            res.download(fileName, (err) => {
              if (err) {
                return res.status(500).send("Erro ao fazer o download do arquivo");
              }
              fs.unlinkSync(fileName); 
              return res.status(200).send("Download Efetuado");
            });
            return res.status(200).send("Tudo Certo");
          });
          return res.status(200).send("Tudo Certo");
        }
      });
    } catch (error) {
      return res.status(500).send("Mensagem de Erro: " + error)
    }
    return res.send("Finalizado o GET com error indefinido");
});

exports.app = functions.https.onRequest(app);