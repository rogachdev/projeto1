"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

// TODO: setar as intents da condicional
// FIXME: ALTEREI AQUI.......
// FIXME: ELTEREI AQUI TAMBÉM ...........
// TODO: ALTERAÇÃOS DOS COMANDOS DO GIT................
const funcWelcome = require("./dialogflow/intent/welcome");
const funcLocalizacao = require('./dialogflow/intent/Intent_localizacao')

const Whatsapp = require("@wppconnect-team/wppconnect");
const dialogflow = require("@google-cloud/dialogflow").v2;
const fs = require("fs");
const moment = require("moment");

// TODO: setar o caminho da chave json
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "keyJson/projeto1-360323-dd70bab4e220.json",
});
async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log(
        ">>> Processando....",
        intentResponse.queryResult.fulfillmentText
      );
      return intentResponse.queryResult;
    } catch (error) {
      console.log(error);
    }
  }
}

Whatsapp.create({
  session: "app-bot",
  statusFind: (statusSession, session) => {
    console.log("Status da sessão: ", statusSession);
    console.log("Nome da sessão: ", session);
  },
})
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    (async () => {
      let TextResponse = await executeQueries(
        "projeto1-360323",
        message.from,
        [message.body],
        "pt-BR"
      );

     await client.sendText(message.from, TextResponse.fulfillmentText);

      switch (TextResponse.intent.displayName) {
        case "DefaultWelcomeIntent":
          funcWelcome.funcWelcome(client, message, TextResponse);
          break;
        case "Intent_localizacao":
            funcLocalizacao.funcLocalizacao(client, message, TextResponse);
          break;
      }
    })();
  });
}
