export interface Topic {
  id: string;
  name: string;
  isNew: boolean;
  opened: boolean;
  checked: boolean;
  children: Topic[];
  expanded: boolean;
  description: string;
}
