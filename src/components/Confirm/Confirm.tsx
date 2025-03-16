import { ReactNode } from "react";
import { X, CircleHelp } from "lucide-react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useAppCtx } from "../../App";
import * as styled from "./Confirm.styles";

export interface ConfirmProps {
  hideOk?: string;
  okText?: string;
  title: ReactNode;
  content: ReactNode;
  cancelText?: string;
  hideCancel?: string;
  callback?: (ok: boolean) => void;
}

export default function Confirm() {
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
          {!config?.hideOk && (
            <Button
              outline
              size="sm"
              color="danger"
              onClick={() => config?.callback(false)}
            >
              {config?.cancelText ?? "Cancelar"}
            </Button>
          )}
          {!config?.hideCancel && (
            <Button
              size="sm"
              color="info"
              onClick={() => config?.callback(true)}
            >
              {config?.okText ?? "Ok"}
            </Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
}
