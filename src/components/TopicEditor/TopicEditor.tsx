import { Edit, X } from "lucide-react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import * as styled from "./TopicEditor.styles";
import useTopicEditor from "./TopicEditor.hook";
import { useTranslation } from "../../i18n/I18nProvider";

export default function TopicEditor() {
  const t = useTranslation();
  const {
    name,
    nameRef,
    nameError,
    description,
    selectedTopic,
    setName,
    handleCancel,
    setDescription,
    handleTopicSave,
  } = useTopicEditor();

  return (
    <Modal isOpen={!!selectedTopic} size="md">
      <ModalHeader>
        <Edit size={20} />
        <styled.Header>
          {selectedTopic?.isNew ? t("createTopic") : t("editTopic")}
        </styled.Header>
        <X className="custom-btn-close" size={20} onClick={handleCancel} />
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">{t("name")}</Label>
            <Input
              required
              id="name"
              name="name"
              type="text"
              bsSize="sm"
              value={name}
              innerRef={nameRef}
              invalid={nameError}
              placeholder={t("namePlaceholder")}
              onChange={(e) => setName(e.target.value)}
            />
            <FormFeedback>{t("nameRequireMessage")}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">{t("description")}</Label>
            <Input
              bsSize="sm"
              type="textarea"
              id="description"
              name="description"
              value={description}
              placeholder={t("descriptionPlaceholder")}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" color="danger" onClick={handleCancel}>
          {t("cancel")}
        </Button>
        <Button size="sm" color="info" onClick={handleTopicSave}>
          {t("save")}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
