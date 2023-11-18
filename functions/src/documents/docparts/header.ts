import { Paragraph, ImageRun, Header, AlignmentType } from 'docx';
import * as fs from 'fs';

const imageBuffer = fs.readFileSync('../functions/src/documents/img/logo-bhave.png');

const image = new ImageRun({
    data: imageBuffer,
    transformation: {
        width: 140,
        height: 60,
    },
});

const paragraphWithImage = new Paragraph({
    children: [image],
    alignment: AlignmentType.CENTER,
});

const description = new Paragraph({
    text: "Relatórios de dados coletados",
    alignment: AlignmentType.CENTER,
    spacing: {
        before: 10,
        after: 10,
    },
});

export const header = new Header({
    children: [paragraphWithImage, description],
});
