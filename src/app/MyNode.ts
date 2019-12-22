export class MyNode {
  id: string;
  size: 150;
  label: string;
  color: string;
  shape: 'box';

  constructor(id: string, label: string, heapCurrent: number, heapMax: number, cpu: string) {
    this.id = id;
    this.label = label + '\n ' + 'CPU LOAD: ' + cpu + '%' + '\n Heap: ' + heapCurrent + '/' + heapMax;
    this.shape = 'box';
    this.color = '#d7f4e6';
    this.size = 150;
  }
}
