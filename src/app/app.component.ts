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
  nodes: MyNode[];
  edges: MyEdge[];
  constructor(private http: HttpClient) {
    // this.http.get('http://localhost:7000/users/1').subscribe((data: User) => this.user = data);
    this.http.get('http://localhost:8080/stats/edges/').subscribe((data: MyEdge[]) => this.edges = data);
    this.http.get('http://localhost:8080/stats/nodes/').subscribe((data: MyNode[]) => this.nodes = data);
  }

  title = 'visual-monitor';
  private networkInstance: any;
  @ViewChild('network') el: ElementRef;

  ngAfterViewInit() {

    const container = this.el.nativeElement;
    const nodes = new DataSet<any>([
    ]);
    this.nodes.forEach(function (node) {
      node.shape = 'box';
      node.color = '#FFCFCF';
    })
    nodes.add(this.nodes);
    const edges = new DataSet<any>([
    ]);
    edges.add(this.edges);
    const data = {nodes, edges};
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
    this.networkInstance = new Network(container, data, options);
  }

  updateMap() {
    // this.networkInstance = new Network(container, data, options);

  }
}
