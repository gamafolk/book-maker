import { useCallback, useState } from "react";
import { useAppCtx } from "../../App";
import { Topic } from "../../App.types";
import { useTranslation } from "../../i18n/I18nProvider";

export default function useHeader() {
  const t = useTranslation();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const confirm = useAppCtx((ctx) => ctx.confirm);
  const selectTopic = useAppCtx((ctx) => ctx.selectTopic);
  const setTopics = useAppCtx((ctx) => ctx.setTopics);

  const toggleOpen = useCallback(
    (topic: Topic) => {
      topic.opened = !topic.opened;

      setTopics((e) => [...e]);
    },
    [setTopics]
  );

  const handleCheck = useCallback(
    async (topic: Topic) => {
      let count = 0;

      topic.children.forEach(function eacher(t) {
        count += Number(!t.checked);
        t.children.forEach(eacher);
      });

      if (!count || topic.checked) {
        topic.checked = !topic.checked;
        setTopics((curr) => [...curr]);
      } else {
        const ok = await confirm({
          okText: t("finish"),
          title: t("finishTopic"),
          cancelText: t("cancel"),
          content: t("finishAllMessage", { count }),
        });

        if (ok) {
          topic.checked = true;
          topic.children.forEach(function eacher(t) {
            t.checked = true;
            t.children.forEach(eacher);
            setTopics((curr) => [...curr]);
          });
        }
      }
    },
    [confirm, setTopics, t]
  );

  const handleExpand = useCallback(
    (topic: Topic) => {
      setTopics((topics) => {
        topics.forEach(function eacher(item) {
          item.expanded = item.id === topic.id ? !topic.expanded : false;
          item.children.forEach(eacher);
        });

        return [...topics];
      });
    },
    [setTopics]
  );

  const handleEditTopic = useCallback(
    (topic: Topic) => {
      selectTopic(topic);
    },
    [selectTopic]
  );

  const handleDeleteTopic = useCallback(
    async (topic: Topic, all: Topic[], index: number) => {
      let count = 0;

      topic.children?.forEach(function eacher(item) {
        count++;
        item.children?.forEach(eacher);
      });

      const ok = await confirm({
        okText: t("delete"),
        title: t("deleteTopic"),
        cancelText: t("cancel"),
        content: (
          <span
            dangerouslySetInnerHTML={{
              __html:
                count > 0 ? t("deleteTopic1", { count }) : t("deleteTopic2"),
            }}
          />
        ),
      });

      if (ok) {
        all.splice(index, 1);
        setTopics((curr) => [...curr]);
      }
    },
    [confirm, setTopics, t]
  );

  const handleMove = useCallback(
    (all: Topic[], index: number, type: "up" | "down") => {
      const targetI =
        type === "up"
          ? Math.max(index - 1, 0)
          : Math.min(index + 1, all.length - 1);

      const curr = all[index];
      const target = all[targetI];

      all[index] = target;
      all[targetI] = curr;

      setTopics((curr) => [...curr]);
    },
    [setTopics]
  );

  return {
    openMenu,
    toggleOpen,
    handleMove,
    setOpenMenu,
    handleCheck,
    handleExpand,
    handleEditTopic,
    handleDeleteTopic,
  };
}
