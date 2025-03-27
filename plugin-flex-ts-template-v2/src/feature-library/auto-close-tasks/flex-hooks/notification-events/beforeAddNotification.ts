import * as Flex from '@twilio/flex-ui';

export const eventName = Flex.NotificationEvent.beforeAddNotification;
export const notificationEventHook = (flex: typeof Flex, manager: Flex.Manager, payload: any, cancel: any) => {
  // filtra somente as mensagens do agent
  console.log(payload);
  if (payload?.context?.lastMessage?.isFromMe) {
    const timestamp = payload?.context?.lastMessage?.source?.timestamp;
    if (timestamp) {
      const task = payload?.context?.task;

      if (task) {
        const attributes = task.attributes;
        if (attributes) {
          task.setAttributes({
            ...attributes,
            lastMessage: new Date(timestamp),
          });
        }
      }
    }
  }
};
