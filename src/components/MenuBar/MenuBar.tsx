import {
  Settings,
  Trash2,
  HardDriveUpload,
  HardDriveDownload,
} from "lucide-react";
import {
  Nav,
  NavbarText,
  DropdownItem,
  DropdownMenu,
  NavbarBrand,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import * as styled from "./MenuBar.styles";
import useMenuBar from "./MenuBar.hook";
import { useI18nContext, useTranslation } from "../../i18n/I18nProvider";

import brazil from "../../assets/BRAZIL.svg";
import usa from "../../assets/USA.svg";

export default function MenuBar() {
  const t = useTranslation();
  const setLang = useI18nContext((ctx) => ctx.setLang);
  const lang = useI18nContext((ctx) => ctx.lang);
  const { results, hasTopics, handleClear, importFile, exportTopics } =
    useMenuBar();

  return (
    <styled.MenuBar
      dark
      expand="sm"
      color="secondary"
      style={{ width: "100%" }}
    >
      <NavbarBrand>Book Maker</NavbarBrand>

      <Nav className="me-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            <Settings size={20} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header className="btn-menu-drpdn">
              {t("languages")}
            </DropdownItem>

            <DropdownItem
              active={lang === "ptBr"}
              className="btn-menu-drpdn"
              onClick={() => setLang("ptBr")}
            >
              <i
                className="icon-brand"
                style={{ backgroundImage: `url(${brazil})` }}
              />
              <span>Português do Brasil</span>
            </DropdownItem>

            <DropdownItem
              active={lang === "enUs"}
              className="btn-menu-drpdn"
              onClick={() => setLang("enUs")}
            >
              <i
                className="icon-brand"
                style={{ backgroundImage: `url(${usa})` }}
              />
              <span>American English</span>
            </DropdownItem>

            <DropdownItem
              header
              className="btn-menu-drpdn"
              style={{ marginTop: 8 }}
            >
              {t("manage")}
            </DropdownItem>

            <DropdownItem
              onClick={handleClear}
              disabled={!hasTopics}
              className="btn-menu-drpdn"
            >
              <Trash2 size={16} />
              <span>{t("deleteAllTheTopics")}</span>
            </DropdownItem>
            <DropdownItem className="btn-menu-drpdn" onClick={importFile}>
              <HardDriveUpload size={16} />
              <span>{t("importFromFile")}</span>
            </DropdownItem>
            <DropdownItem
              disabled={!hasTopics}
              onClick={exportTopics}
              className="btn-menu-drpdn"
            >
              <HardDriveDownload size={16} />
              <span>{t("downloadTopics")}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      {!!results[0] && (
        <NavbarText className="text-light">
          {results[1]} / {results[0]}
        </NavbarText>
      )}
    </styled.MenuBar>
  );
}
