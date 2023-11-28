import * as functions from 'firebase-functions';
import * as express from 'express';
import { db } from './config/firebase';
import { doc, runTransaction, collection, getDocs } from 'firebase/firestore';
import { createDocumento } from './documents/doc';

const app = express();

app.get("", async (req, res) => {
 const studentId = "DgJIrV6takwXdE5XLqeC";
 const studentRef = doc(db, "students", studentId);

 try {
    await runTransaction(db, async (transaction) => {
        const studentDoc = await transaction.get(studentRef);
        if (!studentDoc.exists()) {
            return res.status(404).send("Documento Não Encontrado");
        } else {
            const studentData = studentDoc.data();
            const attendancesRef = collection(studentRef, "attendances");
            const behaviorsRef = collection(studentRef, "behaviors");
            const programsRef = collection(studentRef, "programs");

            const attendancesSnapshot = await getDocs(attendancesRef);
            const behaviorsSnapshot = await getDocs(behaviorsRef);
            const programsSnapshot = await getDocs(programsRef);

            const attendancesData = attendancesSnapshot.docs.map(doc => doc.data());
            const behaviorsData = behaviorsSnapshot.docs.map(doc => doc.data());
            const programsData = await Promise.all(programsSnapshot.docs.map(async (doc) => {
              const programData = doc.data();
              const datasheetsRef = collection(doc.ref, "datasheets");
              const datasheetsSnapshot = await getDocs(datasheetsRef);
              const datasheetsData = await Promise.all(datasheetsSnapshot.docs.map(async (datasheetDoc) => {
                const datasheetData = datasheetDoc.data();
                const attemptBlocksRef = collection(datasheetDoc.ref, "attempt-blocks");
                const attemptBlocksSnapshot = await getDocs(attemptBlocksRef);
                const attemptBlocksData = attemptBlocksSnapshot.docs.map(doc => doc.data());
                return {
                 ...datasheetData,
                 attemptBlocks: attemptBlocksData
                };
              }));

              return {
                ...programData,
                datasheets: datasheetsData
              };
            }));

            const objectDate = {
              ...studentData,
              attendances: attendancesData,
              behaviors: behaviorsData,
              programs: programsData
            };

            const buffer = await createDocumento(objectDate);
            res.setHeader('Content-Disposition', 'attachment; filename=documento.docx');
            res.type('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            return res.send(buffer);
        }
    });
 } catch (error) {
    return res.status(500).send("Mensagem de Erro: " + error);
 }
 return res.send("Finalizado o GET com erro indefinido");
});

exports.app = functions.https.onRequest(app);
