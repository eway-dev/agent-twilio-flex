import { getFeatureFlags } from '../../utils/configuration';
import SendMessageAfterAcceptTaskConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.send_message_after_accept_task as SendMessageAfterAcceptTaskConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
