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
                        label: 'Temperature (°C)',
                        data: this.temperatureData,
                        fill: true,
                        borderColor: '#007bbd',
                        backgroundColor: 'rgba(0, 123, 189, 0.2)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointBackgroundColor: '#007bbd',
                        pointBorderColor: '#ffffff',
                        pointHoverRadius: 6,
                        pointRadius: 4
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
                        beginAtZero: true,
                        grid: {
                            color: '#e6f7ff',
                            borderDash: [5, 5]
                        },
                        ticks: {
                            color: '#4a5568',
                            font: {
                                size: 14
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: true
                        },
                        ticks: {
                            color: '#4a5568',
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        backgroundColor: '#0096ff',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 10,
                        cornerRadius: 8
                    }
                }
            };
        }
    }
};
</script>

<template>
    <div class="chart-container">
        <LineChart v-if="data && data.labels.length" :data="data" :options="options" />
        <p v-else>Waiting for selection...</p>
    </div>
</template>



<style lang="scss" scoped>
.chart-container {
    padding: 1rem;
    background-color: #f7fdfe;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
}
</style>