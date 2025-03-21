import { ReactNode } from "react";
import { X, CircleHelp } from "lucide-react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useAppCtx } from "../../App";
import * as styled from "./Confirm.styles";
import { useTranslation } from "../../i18n/I18nProvider";

export interface ConfirmProps {
  okText?: string;
  hideOk?: boolean;
  title: ReactNode;
  content: ReactNode;
  cancelText?: string;
  hideCancel?: boolean;
  callback?: (ok: boolean) => void;
}

export default function Confirm() {
  const t = useTranslation();
  const config = useAppCtx((ctx) => ctx.confirmConfig);

  return (
    <Modal isOpen={!!config}>
      <ModalHeader>
        <CircleHelp size={20} />
        <styled.Title>{config?.title}</styled.Title>
        <X
          size={20}
          className="custom-btn-close"
          style={{ marginRight: "auto" }}
          onClick={() => config?.callback(false)}
        />
      </ModalHeader>
      <ModalBody>{config?.content}</ModalBody>
      {(!config?.hideOk || !config?.hideCancel) && (
        <ModalFooter>
          {!config?.hideCancel && (
            <Button
              outline
              size="sm"
              color="danger"
              onClick={() => config?.callback(false)}
            >
              {config?.cancelText ?? t("cancel")}
            </Button>
          )}
          {!config?.hideOk && (
            <Button
              size="sm"
              color="info"
              onClick={() => config?.callback(true)}
            >
              {config?.okText ?? t("ok")}
            </Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
}
