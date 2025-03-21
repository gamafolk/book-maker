import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

import { useAppCtx } from "../../App";
import { useTranslation } from "../../i18n/I18nProvider";

export default function useMenuBar() {
  const t = useTranslation();
  const setTopics = useAppCtx((ctx) => ctx.setTopics);
  const confirm = useAppCtx((ctx) => ctx.confirm);
  const importFile = useAppCtx((ctx) => ctx.importFile);
  const topics = useAppCtx((ctx) => ctx.topics);

  const handleClear = useCallback(async () => {
    const ok = await confirm({
      okText: t("delete"),
      cancelText: t("cancel"),
      title: t("deleteTopics"),
      content: <span dangerouslySetInnerHTML={{ __html: t("deleteTopic3") }} />,
    });

    if (ok) {
      setTopics([]);
      localStorage.removeItem("@topics");
    }
  }, [confirm, setTopics, t]);

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

  const results = useMemo(() => {
    let all = 0;
    let done = 0;

    topics.forEach(function eacher(item) {
      all++;
      done += Number(item.checked);
      item.children.forEach(eacher);
    });

    return [all, done];
  }, [topics]);

  return {
    results,
    hasTopics: !!topics.length,
    handleClear,
    importFile,
    exportTopics,
  };
}
