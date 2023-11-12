# Bhave e Squad19 API - Geração de documento e Filtro de Datas para documento

Esta API foi desenvolvida sob medida para a Startup Bhave, com o objetivo de facilitar a integração de dados entre o Firebase e a geração de relatórios detalhados. Ela oferece aos terapeutas a capacidade de criar relatórios personalizados e informativos sobre os pacientes, economizando tempo e melhorando a qualidade do atendimento. Além disso, a API possui recursos avançados de filtragem de datas para aprimorar a análise dos dados, permitindo aos terapeutas acessar informações específicas de datas e identificar tendências ao longo do tempo, otimizando a visualização dos dados de acordo com as necessidades individuais. Em resumo, a API Bhave é uma ferramenta essencial para melhorar a eficiência e qualidade do atendimento médico, fornecendo insights detalhados e recursos de personalização.

---

## Nos dê uma Estrela! :star:
Se você gostou do nosso Projeto, nos dê uma Estrela para que o projeto continue firme e forte! ;)

<p align="center">
  <img src="https://github.com/Sout23Residencia/Squad19/assets/100872126/24088644-ded6-42c7-ab9b-b04cf1e98116" width="500" heigh="700" alt="Screenshot">
</p>

## Tecnologias:
    
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) <br>
- O TypeScript (TS) é uma linguagem de programação que é uma extensão do JavaScript, projetada para adicionar tipagem estática opcional e outras funcionalidades avançadas ao JavaScript. Ele fornece segurança e clareza ao código, identificando erros em tempo de compilação e melhorando a produtividade no desenvolvimento de aplicativos. <br> <br>
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebaseopensource.com/projects/firebase/firebase-tools/) <br>
- Firebase é uma plataforma de desenvolvimento de aplicativos da Google que oferece serviços de banco de dados em tempo real, autenticação de usuários, hospedagem de sites e muito mais.  <br> <br>
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://www.typescriptlang.org/) <br>
- O Node.js é uma plataforma que permite a execução de código JavaScript no servidor. <br> <br>
## Dependências

```
"dependencies": {
    "docx": "^8.2.3",
    "dotenv": "^16.3.1",
    "firebase": "^10.5.0",
    "firebase-admin": "^11.8.0",
    "firebase-functions": "^4.3.1"
  },
```
* docx (^8.2.3):
Esta dependência é utilizada para trabalhar com arquivos Microsoft Word (.docx) em JavaScript ou TypeScript. Permite a criação e manipulação desses documentos.

* dotenv (^16.3.1):
O dotenv é uma biblioteca que facilita a configuração de variáveis de ambiente em um projeto. Ele permite armazenar configurações sensíveis, como chaves de API, de forma segura e acessível.

* firebase (^10.5.0):
Esta é a biblioteca oficial do Firebase para JavaScript/TypeScript. O Firebase é uma plataforma do Google para desenvolvimento de aplicativos móveis e web. Essa biblioteca permite a interação com serviços oferecidos pelo Firebase, como o banco de dados em tempo real, autenticação, armazenamento de arquivos, entre outros.

* firebase-admin (^11.8.0):
Esta é a biblioteca de administração do Firebase para JavaScript/TypeScript. Ela fornece acesso privilegiado aos serviços do Firebase, sendo geralmente utilizada no backend para realizar operações administrativas.

* firebase-functions (^4.3.1):
Essa dependência é parte do Firebase SDK para funções na nuvem. Permite a criação e implementação de funções na nuvem que podem responder a eventos gerados por outros serviços do Firebase, como alterações em dados no banco de dados.

## Dependencias de Dev

````
 "devDependencies": {
    "firebase-functions-test": "^3.1.0",
    "typescript": "^4.9.0"
  },
````
* firebase-functions-test (^3.1.0):

Esta é uma dependência de desenvolvimento específica para testar funções Firebase. Ela fornece ferramentas para simular e testar funções na nuvem localmente.
typescript (^4.9.0):

* TypeScript é um superconjunto de JavaScript que adiciona tipagem estática ao código. Ele é frequentemente usado em projetos grandes para melhorar a manutenção, refatoração e prevenção de erros no desenvolvimento. Esta versão específica indica a versão mínima do TypeScript necessária para o projeto.

  # Gets
