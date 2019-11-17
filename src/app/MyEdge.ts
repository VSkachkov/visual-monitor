import {MyNode} from './MyNode';
import {Color} from './user/Color';

export class MyEdge {
  from: string;
  to: string;
  arrows: string; // TOD create ENUM
  label: string;
  color: Color;
  physics: boolean;
}
