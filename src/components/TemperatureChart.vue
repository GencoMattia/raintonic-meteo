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
            required: true,
        },

        labels: Array,
        required: true,
    },

    data() {
        return {

        };
    },

    computed: {
        chartData() {
            return {
                labels: this.labels,

                datasets: [
                    {
                        label: "Temperature (C°)",
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        data: this.temperatureData,
                    },
                ],
            }
        },

        chartOptions() {
            return {
                responsive: true,
                mantainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time",
                        },
                    },

                    y: {
                        display: true,
                        text: "Temperature (C°)"
                    }
                }
            }
        }
    }
};
</script>

<template>
    <div>
        <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped></style>