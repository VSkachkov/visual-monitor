// app/core/course.model.ts
import { Injectable } from '@angular/core';
// import { Adapter } from './adapter';
import {MyNode} from './MyNode';
import {Adapter} from './Adapter';
// import {Adapter} from './Adapter';
@Injectable({
  providedIn: 'root'
})

export class NodeAdapter implements Adapter<MyNode> {
  adapt(item: any): MyNode {
    return new MyNode (item.id, item.label, item.code, item.heapCurrent, item.heapMax);
  }
}
