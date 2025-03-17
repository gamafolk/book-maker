import {
  Trash2,
  Settings,
  HardDriveUpload,
  HardDriveDownload,
} from "lucide-react";
import * as styled from "./MenuApp.styles";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useCallback } from "react";
import { useAppCtx } from "../../App";
import dayjs from "dayjs";

export default function MenuApp() {
  const setTopics = useAppCtx((ctx) => ctx.setTopics);
  const confirm = useAppCtx((ctx) => ctx.confirm);
  const importFile = useAppCtx((ctx) => ctx.importFile);
  const topics = useAppCtx((ctx) => ctx.topics);

  const handleClear = useCallback(async () => {
    const ok = await confirm({
      title: "Apagar tópicos",
      content: (
        <>
          Se optar por apagar todos os tópicos você perderá todos os dados que
          já editou.
          <br />
          Tem certeza de que deseja continuar?
        </>
      ),
      okText: "Apagar",
      cancelText: "Cancelar",
    });

    if (ok) setTopics([]);
  }, [confirm, setTopics]);

  const exportTopics = useCallback(() => {
    const jsonString = JSON.stringify(topics, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const name = `book_maker_topics_${dayjs().format(
      "DD[_]MM[_]YYYY[_]HH[_]mm[_]ss"
    )}.json`;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }, [topics]);

  return (
    <styled.MenuApp>
      <UncontrolledDropdown>
        <DropdownToggle
          outline
          size="sm"
          color="light"
          className="btn-menu-control"
        >
          <Settings size={20} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="btn-menu-drpdn" onClick={handleClear}>
            <Trash2 size={16} />
            <span>Apagar todos os tópicos</span>
          </DropdownItem>
          <DropdownItem className="btn-menu-drpdn" onClick={importFile}>
            <HardDriveUpload size={16} />
            <span>Importar de arquivo</span>
          </DropdownItem>
          <DropdownItem className="btn-menu-drpdn" onClick={exportTopics}>
            <HardDriveDownload size={16} />
            <span>Baixar tópicos</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </styled.MenuApp>
  );
}
