import { useCallback, useState } from "react";
import { useAppCtx } from "../../App";
import { Topic } from "../../App.types";

export default function useHeader() {
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
    (topic: Topic) => {
      topic.checked = !topic.checked;
      setTopics((curr) => [...curr]);
    },
    [setTopics]
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
        okText: "Apagar",
        title: "Apagar tópico",
        cancelText: "Cancelar",
        content:
          count > 0 ? (
            <>
              Ao apagar este tópico você irá apagar outro(s) {count}{" "}
              subtópico(s).
              <br />
              Tem certeza de que deseja continuar?
            </>
          ) : (
            "Deseja realmente apagar este tópico?"
          ),
      });

      if (ok) {
        all.splice(index, 1);
        setTopics((curr) => [...curr]);
      }
    },
    [confirm, setTopics]
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
