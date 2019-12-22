import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyEdge} from '../MyEdge';
import {MyNode} from '../MyNode';
import {Network, DataSet} from 'vis';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private baseUrl = 'http://localhost:8080/stats/';

  nodes: MyNode[];
  tmpEdges: MyEdge[];
  edge: MyEdge;
  errorMessage: any
  edges = new DataSet<any>([
  ]);
  constructor(private http: HttpClient) {
    this.http.get(`${this.baseUrl}/` + 'edges/').subscribe((data: MyEdge[]) => this.tmpEdges = data);
    // this.http.get(`${this.baseUrl}/` + 'nodes/').subscribe((data: MyNode[]) => this.nodes = data);
    this.getNodes();
  }

  getNodes() {
    const url = `${this.baseUrl}/` + 'nodes/';
    const result = this.http
      .get(url)
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new MyNode(item.id, item.label, item.heapCurrent, item.heapMax, item.cpu)
          )
        )
      ).subscribe((nodes: MyNode[]) => {
        this.nodes = nodes;
      });
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
    this.nodes.forEach(function (node) {
      node.shape = 'box';
      node.color = '#d7f4e6';
    })
    nodes.add(this.nodes);
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
        'enabled': true,
        'minVelocity': 2,
        solver: 'barnesHut',
        barnesHut: {
          gravitationalConstant: -25000,
          centralGravity: 1.3
        }
      }
    };

    const data = {nodes: nodes, edges: this.edges};
    return new Network(container, data, options);
  }
}
