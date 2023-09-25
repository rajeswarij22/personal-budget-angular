import * as d3 from 'd3';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'pb-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createD3Chart();
  }

  private createD3Chart() {
    const svg = d3.select(this.elementRef.nativeElement).select('.d3-chart-container')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');
}
ngOnDestroy(): void {
  // Clean up resources and remove the chart here
  // For example, you can remove the SVG element created in createD3Chart
  d3.select(this.elementRef.nativeElement).select('.d3-chart-container').select('svg').remove();
}
}