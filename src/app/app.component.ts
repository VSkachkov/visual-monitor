import {Component, AfterViewInit, ElementRef, ViewChild, OnInit} from '@angular/core';
import {Network, DataSet} from 'vis';
import {HttpClient} from '@angular/common/http';
import {User} from './user/user';
import {MyNode} from './MyNode';
import {MyEdge} from './MyEdge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements AfterViewInit {
export class AppComponent implements AfterViewInit {

  user: User;
  node: MyNode;
  edge: MyEdge;
  constructor(private http: HttpClient) {
  }

  title = 'visual-monitor';
  @ViewChild('network') el: ElementRef;
  private networkInstance: any;

  ngAfterViewInit() {
    // ngAfterViewInit() {
    this.http.get('http://localhost:7000/users/1').subscribe((data: User) => this.user = data);
    this.http.get('http://localhost:7000/nodes/0').subscribe((data: MyEdge) => this.edge = data);

    // let result = this.http.get('http://localhost:7000/nodes');

    const node1 = {
      'id': 'mod1',
      'size': 150,
      'label': ' DS-BOOKING \n Hello world\n',
      'color': '#FFCFCF',
      'shape': 'box',
      'font': {'face': 'monospace', 'align': 'left'}
    };
    this.node = {
      id: 'mod1',
      size: 150,
      label: ' DS-BOOKING \n Hello my Node\n',
      color: '#FFCFCF',
      shape: 'box'
    }
    const container = this.el.nativeElement;
    const nodes = new DataSet<any>([
      this.node,
      {
        'id': 'mod2',
        'size': 150,
        'label': ' DS-VEHICLE \ntest   bl, 0x01\nje     0x00405a62<<Insn>>\n',
        'color': '#FFCFCF',
        'shape': 'box',
        // 'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod3',
        'size': 150,
        'label': ' FE-GATEWAY \n call   0x004095c6<<Func>>\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod4',
        'size': 150,
        'label': ' DS-CUSTOMER \nret\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod5',
        'size': 150,
        'label': ' DS-USER \nmov    edi, edi\npush   ebp\nmov    ebp, esp\npop    ebp\njmp    0x00417563<<Func>>\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod6',
        'size': 150,
        'label': ' CS-IVSR \nand    ebx, 0xfd<-0x03>\nlea    ecx, [esp + 0x34]\nmov    DWORD PTR ss:[esp + 0x10], ebx\ncall   0x00403450<<Func>>\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod7',
        'size': 150,
        'label': ' AS-PRINTING:\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod8',
        'size': 150,
        'label': ' FE-BEAST :\ncmp    DWORD PTR ss:[esp + 0x30], 0x10\njb     0x00405a62<<Insn>>\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
      {
        'id': 'mod9',
        'size': 150,
        'label': ' CS - KWOM \nadd    esp, 0x04\n',
        'color': '#FFCFCF',
        'shape': 'box',
        'font': {'face': 'monospace', 'align': 'left'}
      },
    ]);
  this.edge = {'from': 'mod1', 'to': 'mod6', 'arrows': 'to', label: 'getById', color: {color: 'green'}, 'physics': false};
    // this.http.get('http://localhost:7000/nodes/0').subscribe((data: MyEdge) => this.edge = data);

    const edges = new DataSet<any>([
      this.edge,
      // {'from': 'mod1', 'to': 'mod6', 'arrows': 'to', label: 'getById', color: 'red'},
      // {'from': 'mod1', 'to': 'mod6', 'arrows': 'to', label: 'getById', color: 'red', smooth: {type: 'curvedCCW', roundness: 0.4}},
      {'from': 'mod1', 'to': 'mod6', 'arrows': 'to', label: 'getAll', color: {color: 'green'}, smooth: {type: 'curvedCCW', roundness: 0.2}},
      {'from': 'mod1', 'to': 'mod2', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'green'}},
      {'from': 'mod2', 'to': 'mod8', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'red'}},
      {'from': 'mod2', 'to': 'mod4', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'green'}},
      {'from': 'mod3', 'to': 'mod9', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'red'}},
      {'from': 'mod3', 'to': 'mod5', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'green'}},
      {'from': 'mod5', 'to': 'cfg_0x00417563', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'red'}},
      {'from': 'mod6', 'to': 'mod7', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'green'}},
      {'from': 'mod6', 'to': 'mod2', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'red'}},
      {
        'from': 'mod7',
        'to': 'cfg_0x00403489',
        'arrows': 'to',
        'physics': false,
        'smooth': {'type': 'cubicBezier'},
        color: {color: 'green'}
      },
      {'from': 'mod7', 'to': 'cfg_0x0042f03f', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'red'}},
      {'from': 'mod8', 'to': 'mod3', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'green'}},
      {'from': 'mod8', 'to': 'mod4', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'red'}},
      {'from': 'mod9', 'to': 'mod4', 'arrows': 'to', 'physics': false, 'smooth': {'type': 'cubicBezier'}, color: {color: 'green'}},
    ]);
    const data = {nodes, edges};
    // const options = {
    //   manipulation: false,
    //   height: '90%',
    //   layout: {
    //     hierarchical: {
    //       enabled: true,
    //       levelSeparation: 300
    //     }
    //   },
    //   physics: {
    //     hierarchicalRepulsion: {
    //       nodeDistance: 300
    //     }
    //   }
    // };
    const options = {
      interaction: {
        hover: true,
        tooltipDelay: 100
      },
      height: '400px',
      edges: {
        smooth: true
      },
      layout: {
        randomSeed: 1,
        improvedLayout: true,
        hierarchical: {
          enabled: true, // change to true to see the other graph
          direction: 'UD',
          nodeSpacing: 400,
          sortMethod: 'directed'
        }
      },
      configure: {},
      'physics': {
        'enabled': false,
        'minVelocity': 0.75
      }
    };
    this.networkInstance = new Network(container, data, options);
  }
}
