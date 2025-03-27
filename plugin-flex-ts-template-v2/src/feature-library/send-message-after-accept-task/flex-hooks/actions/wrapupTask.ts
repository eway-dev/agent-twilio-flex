import * as Flex from '@twilio/flex-ui';

import { FlexAction, FlexActionEvent } from '../../../../types/feature-loader';

export const actionEvent = FlexActionEvent.after;
export const actionName = FlexAction.WrapupTask;

export const actionHook = function exampleCompleteTaskHook(flex: typeof Flex) {
  flex.Actions.replaceAction(`${actionName}`, async (payload) => {
    await sendUserInfoMessage(payload.task);
  });
};

async function sendUserInfoMessage(task: Flex.ITask) {
  try {
    await Flex.Actions.invokeAction('SendMessage', {
      body: `Se tiver mais alguma dúvida,estamos ON 24h pra te ajudar.Muito obrigado pelo contato e tenha um excelente dia. Até mais, sortudo! 🤩`,
      conversationSid: task.attributes.conversationSid,
    });

    await Flex.Actions.invokeAction('CompleteTask', {
      sid: task.sid,
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem de usuário', error);
  }
}
