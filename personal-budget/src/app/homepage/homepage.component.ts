import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartDataset, PieController, ArcElement } from 'chart.js'; // Import necessary Chart.js elements

// Define an interface for the response object
interface BudgetResponse {
  myBudget: {
    title: string;
    budget: number;
  }[];
}

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  public datasource: ChartDataset[] = [
    {
      data: [],
      backgroundColor: [
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
      ]
    }
  ];
  public labels: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<BudgetResponse>('http://localhost:3000/budget').subscribe((res) => {
      this.datasource[0].data = res.myBudget.map(item => item.budget);
      this.labels = res.myBudget.map(item => item.title);
      this.createChart(); // Call createChart after fetching data
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      Chart.register(PieController); // Register the PieController
      Chart.register(ArcElement); // Register the ArcElement

      // Your data
      var data = [
        { category: "Eat out", budget: 30 },
        { category: "Rent", budget: 350 },
        { category: "Grocery", budget: 90 },
      ];

      // Extract labels and data from your data array
      const labels = data.map(item => item.category);
      const budgetData = data.map(item => item.budget);

      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [
            {
              data: budgetData,
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb'
                          ]
            }
          ],
          labels: labels,
        },
      });
    }
  }
}
