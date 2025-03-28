import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';

export const componentName = FlexComponent.TaskCanvasHeader;
export const componentHook = function addUserTaskCanvasHeader(flex: typeof Flex) {
  // flex.TaskCanvasHeader.Content.add(<UserName key="user-name" />, {
  //   sortOrder: -1,
  // });

  flex.TaskCanvasHeader.Content.remove('header', {
    if: (props) => props.task.status === 'wrapping',
  });
};
