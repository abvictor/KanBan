import { ColumnType } from "../utils/enums";

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
}
export type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel["id"]) => void;
};
export interface DragItem {
  index: number;
  id: TaskModel["id"];
  from: ColumnType;
}
