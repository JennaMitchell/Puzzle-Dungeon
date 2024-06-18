import { popupStoreActions } from "../../store/popup-store";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";

const MessagePopup = () => {
  const messagePopupData = useAppSelector(
    (state) => state.popups.messagePopupData
  );
  const dispatch = useAppDispatch();

  const closePopupHandler = () => {
    dispatch(popupStoreActions.setMessagePopupActive(false));
    dispatch(popupStoreActions.setMessagePopupData(null));
  };
  return (
    <div
      className={`messagePopup ${
        messagePopupData.error ? "messagePopupError" : "messagePopupSuccess"
      }`}
    >
      <p className="lh-20 fs-20 clr-black-000">
        {messagePopupData.error ? "Error" : ""} {messagePopupData.message}
      </p>
      <button
        className={`popupButtons lh-16 fs-16  ${
          messagePopupData.error
            ? "bg-red-800 clr-red-200"
            : `bg-lime-800 clr-lime-200`
        }`}
        onClick={closePopupHandler}
      >
        X
      </button>
    </div>
  );
};
export default MessagePopup;
