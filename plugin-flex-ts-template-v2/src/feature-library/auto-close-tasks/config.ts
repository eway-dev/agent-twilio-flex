import { getFeatureFlags } from '../../utils/configuration';
import AutoCloseTasksConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.auto_close_tasks as AutoCloseTasksConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
