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
  ChevronRight,
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
import { useTranslation } from "../../i18n/I18nProvider";

export interface HeaderProps {
  topic: Topic;
  all: Topic[];
  index: number;
}

export default function Header({ topic, all, index }: HeaderProps) {
  const t = useTranslation();
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
    <styled.Header
      data-opened={topic.opened}
      data-menuopen={openMenu}
      className="topics-header"
    >
      <ChevronRight
        className="open-indicator"
        data-opened={topic.opened}
        data-disabled={!topic.children.length && !topic.description.trim()}
      />

      <Button
        outline
        size="sm"
        color="light"
        className="btn-menu-control"
        onClick={() => handleCheck(topic)}
        style={{ border: "none", marginRight: 8 }}
      >
        {!topic.checked && <Square size={18} />}
        {topic.checked && (
          <SquareCheck size={18} data-checked={topic.checked} />
        )}
      </Button>

      <styled.TopicTitle
        id={topic.id}
        onClick={() => toggleOpen(topic)}
        data-openable={!!topic.description?.trim() || topic}
        data-disabled={!topic.children.length && !topic.description.trim()}
      >
        {topic.name?.trim() ? topic.name?.trim() : t("noName")}
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
              <span>{t("moveUp")}</span>
            </DropdownItem>
            <DropdownItem
              className="btn-menu-drpdn"
              disabled={index === all.length - 1}
              onClick={() => handleMove(all, index, "down")}
            >
              <ArrowDown size={16} />
              <span>{t("moveDown")}</span>
            </DropdownItem>

            <DropdownItem
              className="btn-menu-drpdn"
              onClick={() => handleExpand(topic)}
            >
              {!topic.expanded && <Expand size={16} />}
              {topic.expanded && <Shrink size={16} />}
              {!topic.expanded && <span>{t("expand")}</span>}
              {topic.expanded && <span>{t("contract")}</span>}
            </DropdownItem>
            <DropdownItem
              className="btn-menu-drpdn"
              onClick={() => handleDeleteTopic(topic, all, index)}
            >
              <Trash size={16} />
              <span>{t("delete")}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </styled.Controls>
    </styled.Header>
  );
}
