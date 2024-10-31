import store from './store.js';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const myFunction = {
    renderChart(argomento) {
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Cancella il grafico canvas quando si cambia città
        }

        this.chartInstance = new Chart(argomento, {
            type: 'line',
            data: store.data,
            options: store.options,
        })
        return this.chartInstance;
    }
}

export default myFunction;