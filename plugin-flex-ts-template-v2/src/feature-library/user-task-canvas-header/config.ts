import { getFeatureFlags } from '../../utils/configuration';
import UserTaskCanvasHeaderConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.user_task_canvas_header as UserTaskCanvasHeaderConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
