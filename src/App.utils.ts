const KEYS = [
  "id",
  "name",
  "isNew",
  "opened",
  "checked",
  "children",
  "expanded",
  "description",
];

export function isDataValid(data: any) {
  if (!Array.isArray(data)) return false;

  let res = true;

  data.forEach(function eacher(item) {
    if (res) {
      res = !(
        !item ||
        typeof item !== "object" ||
        KEYS.some((k) => !(k in item)) ||
        typeof item.id !== "string" ||
        typeof item.name !== "string" ||
        !item.name.trim() ||
        typeof item.isNew !== "boolean" ||
        typeof item.opened !== "boolean" ||
        !Array.isArray(item.children) ||
        typeof item.expanded !== "boolean" ||
        typeof item.description !== "string"
      );
    }

    if (res) item.children.forEach(eacher);
  });

  return res;
}
