import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        title: 'Test',
        text: '[E] - Access locker inventory  \n [G] - Do something else',
        position: 'left-center',
        icon: 'door-open',
      },
    },
  ]);
};
