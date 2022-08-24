
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.funcWelcome = void 0;

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

const moment = require("moment");
const fs = require("fs");

async function funcWelcome(client, message, _intent) {
  
    // FIXME: puxa o nome do usuario contido do whatsapp.
    const contact = await client
    .getContact(message.from)
    .then((result) => {
      return result.pushname || result.verifiedName || "";
    })
    .catch((error) => {
      console.log(error);
    });

  //MENU PRINCIPAL
  if ( _intent.fulfillmentText === "para melhor rar o seu atendimento fique esperto nas dicas!" && message.isGroupMsg === false ) {
    
    (async () => {
      const now = moment().format("DD/MM/YYYY  *H:m:ss*");

      await client
        .sendImage(
          message.from,
          "img/pizzaria.jpeg",
          "image.jpeg",
          `Olá *${contact}* 😉\n\nNós da *Pizzaria dois sabores* estamos felizes em atende-lo!, digite um número para iniciar o seu atendimento.\n` +
            `--------------------------------------------- \n` +
            "1️⃣  - 🛍️ | *FZER CADASTRO.*  \n" +
            `2️⃣  - 📍 | *NOSSA LOCALIZAÇÃO.* \n` +
            `3️⃣  - 🎉 | *PROMOÇÕES.* \n` +
            `4️⃣  - 👨🏻‍💻 | *CONTATO.* \n` +
            `--------------------------------------------- \n` +
            `*️⃣  - *Para sair*\n\n` +
            `*Horário do atendimento:*\n ${now}`
        )
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    })();
  }












  //CADASTRO
  if (
    _intent.fulfillmentText === "Salvando o cadastro, aguarde..." &&
    message.isGroupMsg === false
  ) {
    (async () => {
      const now = moment().format("DD/MM/YYYY  *H:m:ss*");

      let _Nome = _intent.parameters.fields.nome.stringValue;
      let _Telefone = _intent.parameters.fields.telefone.stringValue;
      let _Endereco = _intent.parameters.fields.endereco.stringValue;

      // , '553799663533@c.us'
      let phone = [message.from, "14134775978@c.us"];
      for (let i in phone) {
        await client
          .sendImage(
            phone[i],
            `img/cadastro.png`,
            "image.png",
            "\n" +
              `_*DESCRIÇÃO DO CADASTRO*_\n\n` +
              // '-----------------------------------------------------------\n' +
              "*NOME:*\n " +
              _Nome +
              "\n\n" +
              // '-----------------------------------------------------------\n' +
              "*TELEFONE:*\n" +
              _Telefone +
              "\n\n" +
              // '-----------------------------------------------------------\n' +
              "*ENDEREÇO:*\n " +
              _Endereco +
              "\n\n" +
              // '-----------------------------------------------------------\n' +
              `*CADASTRO FEITO EM:*\n${now}`
          )
          .then((result) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }

  
  //PROMOÇÃO
  if (
    _intent.fulfillmentText === "Acessando *as promoções*, aguarde..." &&
    message.isGroupMsg === false
  ) {
    (async () => {
      const now = moment().format("DD/MM/YYYY  *H:m:ss*");

      function listarImages(diretorio, arquivos) {
        if (!arquivos) arquivos = [];
        let listaArquivos = fs.readdirSync(diretorio);
        listaArquivos.forEach((img) => {
          client
            .sendImage(message.from, `img/produtos/${img}`, img)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        });
      }

      listarImages("img/produtos");
      await client.sendText(
        message.from,
        "*Aqui estão os nossos produtos na promoção* 😉"
      );
      await client.sendMessageOptions(
        message.from,
        `*${contact}* posso lhe ajudar em algo mais?`,
        {
          //title: `${contact}`,
          footer: "_Toque nos botões para interagir._",
          isDynamicReplyButtonsMsg: true,
          dynamicReplyButtons: [
            {
              buttonId: "id1",
              buttonText: {
                displayText: "Sim por favor",
              },
              type: 1,
            },
            {
              buttonId: "id2",
              buttonText: {
                displayText: "Não obrigado",
              },
              type: 1,
            },
          ],
        }
      );
      return;
    })();
  }
}

exports.funcWelcome = funcWelcome;
