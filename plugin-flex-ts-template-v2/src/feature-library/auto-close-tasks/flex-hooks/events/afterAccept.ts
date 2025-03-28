import * as Flex from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';

export const eventName = FlexEvent.taskAccepted;

export const eventHook = function afterAcceptHook(flex: typeof Flex) {
  const intervalId = setInterval(() => {
    console.log('afterAccept');
  }, 5000);

  return () => clearInterval(intervalId);
};
