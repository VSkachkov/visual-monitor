import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyEdge} from '../MyEdge';
import {MyNode} from '../MyNode';
import {Network, DataSet} from 'vis';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  nodes: MyNode[];
  tmpEdges: MyEdge[];
  edge: MyEdge;
  edges = new DataSet<any>([
  ]);
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/stats/edges/').subscribe((data: MyEdge[]) => this.tmpEdges = data);
    this.http.get('http://localhost:8080/stats/nodes/').subscribe((data: MyNode[]) => this.nodes = data);
  }

  updateNodes() {
    this.http.get('http://localhost:8080/stats/edges/update/').subscribe((data: MyEdge) => this.edge = data);
    this.edges.add(this.edge);
    // this.http.get('http://localhost:8080/stats/nodes/').subscribe((data: MyNode[]) => this.nodes = data);
  }

  getNetwork(nativeElement: any) {
    const container = nativeElement;
    const nodes = new DataSet<any>([
    ]);

    nodes.add(this.nodes);
    // const newColor = '#' + Math.floor(Math.random() * 255 * 255 * 255).toString(16);
    // nodes.update([{ id: 1, color: { background: newColor } }])
    this.edges.add(this.tmpEdges);
    const options = {
      interaction: {
        hover: false,
        tooltipDelay: 100
      },
      height: '400px',
      edges: {
        smooth: true
      },
      layout: {
        randomSeed: 3,
        improvedLayout: true,
        clusterThreshold: 20,
        hierarchical: {
          enabled: false, // change to true to see the other graph
          direction: 'LR',
          nodeSpacing: 800,
          sortMethod: 'directed'
        }
      },
      configure: {},
      'physics': {
        'enabled': false,
        'minVelocity': 2
      }
    };

    const data = {nodes: nodes, edges: this.edges};
    return new Network(container, data, options);
  }
}
