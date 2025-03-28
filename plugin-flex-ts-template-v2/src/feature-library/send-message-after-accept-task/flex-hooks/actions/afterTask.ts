import * as Flex from '@twilio/flex-ui';

import { FlexAction, FlexActionEvent } from '../../../../types/feature-loader';

export const actionEvent = FlexActionEvent.after;
export const actionName = FlexAction.AcceptTask;

async function generateUserInfoMessage(task: Flex.ITask) {
  const { conversationsClient } = Flex.Manager.getInstance();

  const conversation = await conversationsClient.getConversationBySid(task?.attributes?.conversationSid);

  const protocol = Math.floor(100000 + Math.random() * 900000);

  const preEngagementData = (conversation.attributes as any)?.pre_engagement_data;

  return (
    `Bem vindo, ${preEngagementData?.friendlyName}!\n` +
    'Segue os seus dados:\n' +
    `Nome: ${preEngagementData?.friendlyName}\n` +
    `Email: ${preEngagementData?.email}\n` +
    `CPF: ${preEngagementData?.cpf}\n` +
    `Aqui está o número do seu protocolo: ${protocol}`
  );
}

export const actionHook = function exampleAfterTaskHook(flex: typeof Flex) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, (payload) => {
    setTimeout(async () => {
      await sendUserInfoMessage(payload.task);
    }, 3000);
  });
};

async function sendUserInfoMessage(task: Flex.ITask) {
  try {
    const message = await generateUserInfoMessage(task);
    await Flex.Actions.invokeAction('SendMessage', {
      body: message,
      conversationSid: task.attributes.conversationSid,
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem de usuário', error);
  }
}
