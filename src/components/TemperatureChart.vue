<script>
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    components: {
        LineChart: Line,
    },

    props: {
        temperatureData: {
            type: Array,
            required: true
        },
        labels: {
            type: Array,
            required: true
        }
    },

    data() {
        return {

        };
    },

    computed: {
        data() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Temperature',
                        data: this.temperatureData,
                        fill: false,
                        borderColor: 'blue',
                        tension: 0.1
                    }
                ]
            };
        },
        options() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
        }
    },
};
</script>

<template>
    <div class="chart-container">
        <LineChart v-if="data && data.labels.length" :data="data" :options="options" />
        <p v-else class="loading-text">Loading data...</p>
    </div>
</template>

<style lang="scss" scoped>
.chart-container {
    position: relative;
    margin: auto;
    height: 400px;
    width: 600px;

    .chartjs-render-monitor {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .chartjs-tooltip {
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 4px;
        padding: 5px;
        font-size: 0.8rem;
    }
}

.loading-text {
    text-align: center;
    color: #007bff;
    font-size: 1.2rem;
    margin-top: 20px;
}
</style>
