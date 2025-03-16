import { useCallback, useEffect, useMemo, useState } from "react";
import { Topic } from "../App.types";
import { getId } from "../App.constants";
import { ConfirmProps } from "../components/Confirm/Confirm";

export default function useApp() {
  const [confirmConfig, setConfirmConfig] = useState<ConfirmProps>();
  const [selectedTopic, selectTopic] = useState<Topic>();
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: getId(),
      children: [],
      isNew: false,
      opened: false,
      checked: false,
      expanded: false,
      name: "Primeiro",
      description: "Primeiro",
    },
  ]);

  const filteredTopics = useMemo(() => {
    let target: Topic | null = null;

    topics.forEach(function eacher(item) {
      if (!target) {
        if (item.expanded) {
          target = item;
        } else {
          item.children.forEach(eacher);
        }
      }
    });

    return target ? [target] : topics;
  }, [topics]);

  const handleAddTopic = useCallback((store: Topic[]) => {
    const newTopic: Topic = {
      id: getId(),
      name: "",
      isNew: true,
      children: [],
      opened: false,
      checked: false,
      expanded: false,
      description: "",
    };

    store.push(newTopic);

    setTopics((current) => [...current]);
    selectTopic(newTopic);
  }, []);

  const confirm = useCallback(
    async (config: Omit<ConfirmProps, "callback">) => {
      const payload: ConfirmProps = { ...config, callback: () => null };

      setConfirmConfig(payload);

      const res = await new Promise<boolean>(
        (resolve) => (payload.callback = resolve)
      );

      setConfirmConfig(undefined);

      return res;
    },
    []
  );

  useEffect(() => {
    localStorage.setItem("@topics", JSON.stringify(topics));
  }, [topics]);

  return {
    topics,
    selectedTopic,
    confirmConfig,
    filteredTopics,
    confirm,
    setTopics,
    selectTopic,
    handleAddTopic,
    setConfirmConfig,
  };
}
