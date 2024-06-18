import { popupStoreActions } from "../../store/popup-store";

type MessagePopupDataType = {
  error: boolean;
  message: string;
};

export const messagePopupHandler = (
  dispatch: any,
  messageData: MessagePopupDataType
) => {
  dispatch(popupStoreActions.setMessagePopupActive(true));
  dispatch(popupStoreActions.setMessagePopupData(messageData));
};
