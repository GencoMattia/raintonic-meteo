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
    <div>
        <LineChart v-if="data && data.labels.length" :data="data" :options="options" />
        <p v-else>Waiting for selection...</p>
    </div>
</template>


<style scoped></style>