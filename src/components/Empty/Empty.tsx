import { ArrowUpFromLine, ListTree, Plus } from "lucide-react";
import * as styled from "./Empty.styles";
import { Button } from "reactstrap";
import { useTranslation } from "../../i18n/I18nProvider";
import { useAppCtx } from "../../App";

export default function Empty() {
  const t = useTranslation();
  const topics = useAppCtx((ctx) => ctx.topics);
  const importFile = useAppCtx((ctx) => ctx.importFile);
  const handleAddTopic = useAppCtx((ctx) => ctx.handleAddTopic);

  return (
    <styled.Empty>
      <ListTree size={45} />
      <h1>{t("noTopics")}</h1>
      <span>
        {t("noTopicsMessage1")}
        <br />
        {t("noTopicsMessage2")}
        <br />
        {t("happyEditing")}
      </span>
      <div>
        <Button
          size="sm"
          color="primary"
          onClick={() => handleAddTopic(topics)}
        >
          <Plus size={16} />
          {t("createANewOne")}
        </Button>
        <Button size="sm" color="secondary" onClick={importFile}>
          <ArrowUpFromLine size={14} />
          {t("import")}
        </Button>
      </div>
    </styled.Empty>
  );
}
