import { useCallback, useEffect, useMemo, useState } from "react";
import { Topic } from "../App.types";
import { getId } from "../App.constants";
import { ConfirmProps } from "../components/Confirm/Confirm";
import { isDataValid } from "../App.utils";
import { useTranslation } from "../i18n/I18nProvider";

export default function useApp() {
  const t = useTranslation();
  const [confirmConfig, setConfirmConfig] = useState<ConfirmProps>();
  const [selectedTopic, selectTopic] = useState<Topic>();
  const [topics, setTopics] = useState<Topic[]>([]);

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

  const importFile = useCallback(async () => {
    if (topics.length) {
      const ok = await confirm({
        okText: t("import"),
        cancelText: t("cancel"),
        title: t("importTopics"),
        content: (
          <span dangerouslySetInnerHTML={{ __html: t("importMessage") }} />
        ),
      });

      if (!ok) return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.multiple = false;

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = JSON.parse(String(reader.result));

          if (isDataValid(obj) && obj.length) {
            setTopics(obj);
          } else {
            confirm({
              title: t("error"),
              hideCancel: true,
              okText: t("gotIt"),
              content: t("invalidFileMessage"),
            });
          }
        } catch (error) {
          //
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }, [topics.length, confirm, t]);

  useEffect(() => {
    if (topics.length) {
      localStorage.setItem("@topics", JSON.stringify(topics));
    }
  }, [topics]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("@topics");
      const obj = JSON.parse(raw);

      if (isDataValid(obj)) {
        setTopics(obj);
      }
    } catch (error) {
      //
    }
  }, []);

  return {
    topics,
    selectedTopic,
    confirmConfig,
    filteredTopics,
    confirm,
    setTopics,
    importFile,
    selectTopic,
    handleAddTopic,
    setConfirmConfig,
  };
}
