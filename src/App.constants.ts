import { v4 as uuidv4 } from "uuid";

export const CONTROL_SIZE = 14;

export const getId = () => `__${uuidv4()}`;
