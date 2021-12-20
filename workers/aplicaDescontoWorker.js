const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'AplicaDesconto'
client.subscribe("AplicaDesconto", async function({ task, taskService }) {
  // Put your business logic  
  const taxa = task.variables.get("taxa")
  console.log("Taxa atual: "+ taxa);

  const desconto = task.variables.get("desconto")
  const nova_taxa = taxa*(1-desconto);  
  console.log("Desconto de: "+ desconto*100 + "% aplicado");
  console.log("Nova taxa: "+ nova_taxa);

  const processVariables = new Variables();
  processVariables.set("taxa", nova_taxa);
  


  // complete the task
  await taskService.complete(task, processVariables);
});