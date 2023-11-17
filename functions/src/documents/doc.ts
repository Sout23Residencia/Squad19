import { Document, Packer, Paragraph, BorderStyle, Table, TableCell, TableRow } from 'docx';
import { footer } from '../documents/docparts/footer';
import { header } from '../documents/docparts/header';

export function createDocumento(objectDate: any) {
  const programData = objectDate.programs;
  const behaviorData = objectDate.behaviors;

  let children = [
      new Paragraph("Estudante: " + objectDate["name"]),
      new Paragraph("Clinica: "),
      new Paragraph("Emitido em: " + objectDate.metadata["createdAt"]),
      new Paragraph("Periodo: "),
  ];

  const line = new Paragraph({
      border: {
          bottom: {
              style: BorderStyle.SINGLE,
              size: 1,
              color: "000000",
          },
      },
  });

  const tables = programData.map((program: any) => {
      const Paragraph1 = new Paragraph("Programa: " + program["name"] + " | Área: " + program["area"]);
      const Paragraph2 = new Paragraph("Folha: DAV de Cores" + " | Tipo: DTT");

      return [Paragraph1, Paragraph2, new Table({
          rows: [
              new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph("Data")] }),
                    new TableCell({ children: [new Paragraph("Terapeuta")] }),
                    new TableCell({ children: [new Paragraph("Fase")] }),
                    new TableCell({ children: [new Paragraph("Tentativas")] }),
                    new TableCell({ children: [new Paragraph("incorretas")] }),
                    new TableCell({ children: [new Paragraph("Ajuda")] }),
                    new TableCell({ children: [new Paragraph("Independentes")] }),
                    new TableCell({ children: [new Paragraph("Acertos")] }),
                ],
              }),
              ...behaviorData.map((behavior: any) => {
                return new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(behavior.metadata["createdAt"])] }),
                        new TableCell({ children: [new Paragraph(" " + behavior.metadata.createdBy["firstName"] + " " + behavior.metadata.createdBy["lastName"] + " ")]}),
                    ],
                });
              }),
          ],
      })];
  }).flat();

  const doc = new Document({
      sections: [{
          properties: {},
          children: [...children, line, ...tables],
          headers: {
              default: header,
          },
          footers: {
              default: footer,
          },
      }]
  });

  return Packer.toBuffer(doc);
}
