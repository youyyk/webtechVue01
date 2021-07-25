<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    
    data () {
      return {
        // incomeList: 100000,
        // expendList: 500000,
        chartData: {
          labels: ["รายรับ","รายจ่าย"],
          datasets: [
            {
              data: [1,2],
              backgroundColor: ["green","red"],
            },
          ]
        },
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
                label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`, 
                title: () => null,
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
    methods:{

    }
  }
</script>