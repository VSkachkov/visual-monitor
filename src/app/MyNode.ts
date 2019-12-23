export class MyNode {
  id: string;
  size: 150;
  label: string;
  color: string;
  shape: 'box';

  constructor(id: string, label: string, state: string, heapCurrent: number, heapMax: number, cpu: string) {
    this.id = id;
    this.label = label + '\n ' + 'CPU LOAD: ' + cpu + '%' + '\n MEMORY: ' + heapCurrent + '/' + heapMax + '\n' + 'STATUS: ' + state;
    this.shape = 'box';
    this.color = this.getColor(state);
    this.size = 150;
  }

  private GREEN = '#d7f4e6';
  private BUSY = '#fdcc70';
  private GREY = '#c1c1c1';
  private RED = '#ff9ea4';

  private getColor(state: string) {
    if (state === 'OK') { return this.GREEN; }
    if (state === 'BUSY') {return this.BUSY; }
    if (state === 'UNAVAILABLE') {return this.GREY; }
    if (state === 'ERROR') {return this.RED; }
  }
}
