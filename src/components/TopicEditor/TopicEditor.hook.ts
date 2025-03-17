import { useCallback, useEffect, useRef, useState } from "react";
import { useAppCtx } from "../../App";

export default function useTopicEditor() {
  const nameRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const selectedTopic = useAppCtx((ctx) => ctx.selectedTopic);
  const selectTopic = useAppCtx((ctx) => ctx.selectTopic);
  const setTopics = useAppCtx((ctx) => ctx.setTopics);

  const handleTopicSave = useCallback(() => {
    if (!name.trim()) {
      return setNameError(true);
    }

    selectTopic(undefined);

    if (!selectedTopic) return;

    setTopics((all) => {
      all.forEach(function eacher(item) {
        if (item.id === selectedTopic.id) {
          item.name = name;
          item.isNew = false;
          item.description = description.trim();
        }

        item.children.forEach(eacher);
      });

      return [...all];
    });
  }, [description, name, selectedTopic, setTopics, selectTopic]);

  const handleCancel = useCallback(() => {
    if (selectedTopic?.isNew) {
      setTopics((current) => {
        current.forEach(function eacher(item) {
          item.children = item.children.filter((e) => !e.isNew);
          item.children.forEach(eacher);
        });

        return current.filter((e) => !e.isNew);
      });
    }

    selectTopic(undefined);
  }, [selectedTopic?.isNew, setTopics, selectTopic]);

  useEffect(() => {
    if (selectedTopic) {
      setTimeout(() => {
        nameRef.current?.focus();
        // nameRef.current?.select();
      }, 300);
    }
  }, [selectedTopic]);

  useEffect(() => {
    setNameError(false);
    setName(selectedTopic?.name ?? "");
    setDescription(selectedTopic?.description ?? "");
  }, [selectedTopic?.description, selectedTopic?.name]);

  return {
    name,
    nameRef,
    nameError,
    description,
    selectedTopic,
    setName,
    handleCancel,
    setDescription,
    handleTopicSave,
  };
}
