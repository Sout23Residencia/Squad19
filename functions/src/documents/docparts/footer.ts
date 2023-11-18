import { Paragraph, Footer} from 'docx';

export const footer = new Footer({
    children: [
        new Paragraph('®bHave Tecnologia Comportamental'),
        new Paragraph('RUA DO APOLO, 235. BAIRRO DO RECIFE, RECIFE, PE. CEP 50.030.220, CAIXA POSTAL 0015'),
        new Paragraph('CNPJ: 24.832.498/0001-17 ● 55 81 3224.7289 ● contato@bhave.life ●  www.bhave.life'),
    ],
});
