export class Audit {
  entityName: string;
  userId: string;
  inclusionDate: Date;
  action: string;
}

let actions = new Map<string, string>();
actions.set('Deleted', 'Deletar');
actions.set('Modified', 'Modificar');
actions.set('Added', 'Adicionar');

export function getAction(action: string): string {
  return actions.get(action);
}
