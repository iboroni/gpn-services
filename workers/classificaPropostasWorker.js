const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'ClassificaPropostas'
client.subscribe("ClassificaPropostas", async function({ task, taskService }) {
  // Put your business logic  
  const processoPrioritario = Math.floor(Math.random() * 10)+1; //Pegando um numero aleatorio entre 1 e 10 para retornar como id do processo prioritario
  const processVariables = new Variables();
  processVariables.set("processoPrioritario", processoPrioritario);

  // complete the task
  await taskService.complete(task, processVariables);
});