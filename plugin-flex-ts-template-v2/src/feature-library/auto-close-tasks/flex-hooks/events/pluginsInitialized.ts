import * as Flex from '@twilio/flex-ui';
import moment from 'moment';

import { FlexEvent } from '../../../../types/feature-loader';

export const eventName = FlexEvent.pluginsInitialized;

const INACTIVITY_CHECK_INTERVAL = 5000; // 5 segundos
const INACTIVITY_TIMEOUT = 1; // minutos
const INACTIVITY_MESSAGE = 'Você está inativo há mais de 5 minutos, vamos encerrar a conversa.';

export const eventHook = function checkTasksToClose(flex: typeof Flex) {
  const intervalId = setInterval(async () => {
    try {
      const workerTasks = getAssignedTasks();

      for (const task of workerTasks) {
        const lastMessageTimestamp = task.attributes?.lastMessage;

        if (!lastMessageTimestamp) continue;

        const lastMessageTime = moment(lastMessageTimestamp);
        const currentTime = moment();
        const minutes = moment.duration(currentTime.diff(lastMessageTime)).asMinutes();

        if (minutes > INACTIVITY_TIMEOUT) {
          await closeTask(flex, task);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar tarefas inativas:', error);
    }
  }, INACTIVITY_CHECK_INTERVAL);

  return () => clearInterval(intervalId);
};

const closeTask = async (flex: typeof Flex, task: Flex.ITask) => {
  try {
    await Flex.Actions.invokeAction('SendMessage', {
      body: INACTIVITY_MESSAGE,
      conversationSid: task.attributes.conversationSid,
    });

    await Flex.Actions.invokeAction('CompleteTask', { sid: task.sid });
  } catch (error) {
    console.error(`Erro ao fechar a tarefa ${task.sid}:`, error);
  }
};

const getAssignedTasks = () => {
  const state = Flex.Manager.getInstance().store.getState();
  return Array.from(state.flex.worker.tasks.values());
};
