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

export default function TopicEditor() {
  const {
    name,
    opened,
    nameRef,
    nameError,
    description,
    setName,
    handleCancel,
    setDescription,
    handleTopicSave,
  } = useTopicEditor();

  return (
    <Modal isOpen={opened} size="md">
      <ModalHeader>
        <Edit size={20} />
        <styled.Header>Editar tópico</styled.Header>
        <X className="custom-btn-close" size={20} onClick={handleCancel} />
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Nome</Label>
            <Input
              required
              id="name"
              name="name"
              type="text"
              bsSize="sm"
              value={name}
              innerRef={nameRef}
              invalid={nameError}
              placeholder="Defina um nome ara o tópico"
              onChange={(e) => setName(e.target.value)}
            />
            <FormFeedback>É necessário fornecer um nome</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Descrição</Label>
            <Input
              bsSize="sm"
              type="textarea"
              id="description"
              name="description"
              value={description}
              placeholder="Defina uma decrição para o tópico"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" outline color="danger" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button size="sm" outline color="info" onClick={handleTopicSave}>
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
