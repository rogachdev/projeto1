"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.funcLocalizacao = void 0;

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

const moment = require("moment");
const fs = require("fs");

async function funcLocalizacao(client, message, _intent) {
  // FIXME: puxa o nome do usuario contido do whatsapp.
  const contact = await client
    .getContact(message.from)
    .then((result) => {
      return result.pushname || result.verifiedName || "";
    })
    .catch((error) => {
      console.log(error);
    });

  //LOCALIZAÇÃO
  if (
    _intent.fulfillmentText === "Ok acessando a *nossa localização*..." &&
    message.isGroupMsg === false
  ) {
    (async () => {
      await client.sendLocation(
        message.from,
        "-13.6561589",
        "-69.7309264",
        "Brasil"
      );
      await client
        .sendMessageOptions(
          message.from,
          `*${contact}*\nposso lhe ajudar em algo mais?`,
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
        )
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    })();
  }
}

exports.funcLocalizacao = funcLocalizacao;