import {
  Edit,
  Plus,
  Trash,
  Shrink,
  Square,
  Expand,
  ArrowUp,
  Ellipsis,
  ArrowDown,
  GitBranchPlus,
  SquareCheck,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import * as styled from "./Header.styles";
import { Topic } from "../../App.types";
import { useAppCtx } from "../../App";
import useHeader from "./Header.hook";

export interface HeaderProps {
  topic: Topic;
  all: Topic[];
  index: number;
}

export default function Header({ topic, all, index }: HeaderProps) {
  const {
    openMenu,
    handleMove,
    toggleOpen,
    setOpenMenu,
    handleCheck,
    handleExpand,
    handleEditTopic,
    handleDeleteTopic,
  } = useHeader();

  const handleAddTopic = useAppCtx((ctx) => ctx.handleAddTopic);

  return (
    <styled.Header data-menuopen={openMenu} className="topics-header">
      <Button
        outline
        size="sm"
        color="light"
        className="btn-menu-control"
        onClick={() => handleCheck(topic)}
        style={{ border: "none", marginRight: 8 }}
      >
        {!topic.checked && <Square size={18} />}
        {topic.checked && <SquareCheck size={18} color="#1de9b6" />}
      </Button>

      <styled.TopicTitle
        id={topic.id}
        data-openable={!!topic.description?.trim() || topic}
        onClick={() => toggleOpen(topic)}
      >
        {topic.name?.trim() ? topic.name?.trim() : "Sem nome"}
      </styled.TopicTitle>

      <styled.Controls data-meuopened={openMenu}>
        <Button
          outline
          size="sm"
          color="light"
          style={{ border: "none" }}
          className="btn-menu-control"
          onClick={() => handleEditTopic(topic)}
        >
          <Edit size={16} />
        </Button>

        {!topic.children.length && (
          <Button
            outline
            size="sm"
            color="light"
            style={{ border: "none" }}
            className="btn-menu-control"
            onClick={() => handleAddTopic(topic.children)}
          >
            <GitBranchPlus size={18} />
          </Button>
        )}

        {all.length - 1 === index && (
          <Button
            outline
            size="sm"
            color="light"
            style={{ border: "none" }}
            className="btn-menu-control"
            onClick={() => handleAddTopic(all)}
          >
            <Plus size={18} />
          </Button>
        )}

        <Dropdown isOpen={openMenu} toggle={() => setOpenMenu((e) => !e)}>
          <DropdownToggle
            outline
            size="sm"
            color="light"
            style={{ border: "none" }}
            className="btn-menu-control"
          >
            <Ellipsis size={18} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              disabled={!index}
              className="btn-menu-drpdn"
              onClick={() => handleMove(all, index, "up")}
            >
              <ArrowUp size={16} />
              <span>Mover para cima</span>
            </DropdownItem>
            <DropdownItem
              className="btn-menu-drpdn"
              disabled={index === all.length - 1}
              onClick={() => handleMove(all, index, "down")}
            >
              <ArrowDown size={16} />
              <span>Mover para baixo</span>
            </DropdownItem>

            <DropdownItem
              className="btn-menu-drpdn"
              onClick={() => handleExpand(topic)}
            >
              {!topic.expanded && <Expand size={16} />}
              {topic.expanded && <Shrink size={16} />}
              {!topic.expanded && <span>Expandir</span>}
              {topic.expanded && <span>Contrair</span>}
            </DropdownItem>
            <DropdownItem
              className="btn-menu-drpdn"
              onClick={() => handleDeleteTopic(topic, all, index)}
            >
              <Trash size={16} />
              <span>Apagar</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </styled.Controls>
    </styled.Header>
  );
}
