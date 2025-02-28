export class Task {
  id: number;
  idColumn: string;
  content: string;
  createdAt: Date;

  constructor({ id, idColumn, content, createdAt }) {
    if (id !== undefined) this.id = id;
    if (content !== undefined) this.content = content;
    if (createdAt !== undefined) this.createdAt = createdAt;
    if (idColumn !== undefined) this.idColumn = idColumn;
  }
}
