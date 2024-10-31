<script>
import axios from 'axios';
import { FontAwesomeIcon } from "../assets/js/font-awesome.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faCloud, faCloudRain, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import TemperatureChart from '@/components/TemperatureChart.vue';

library.add(faSun, faCloud, faCloudRain, faSnowflake, faSmog);

export default {
    components: {
        FontAwesomeIcon,
        TemperatureChart,
    },

    data() {
        return {
            cityQuery: "",
            suggestions: [],
            selectedCity: null,
            currentWeatherData: null,
            hourlyWeatherData: null,
            favoriteCities: [],
            favoriteWeatherData: [],
            temperatureData: [],
            labels: [],
            initialFavoriteWeatherData: [], // Save initial order
            isSortedAsc: true, // Track sort order
        };
    },

    methods: {
        async fetchCitySuggestions() {
            if (this.cityQuery.length > 2) {
                axios.get("https://geocoding-api.open-meteo.com/v1/search", {
                    params: {
                        name: this.cityQuery,
                        count: 5,
                        format: "json",
                        language: "en",
                    }
                }).then((response) => {
                    this.suggestions = response.data.results.map(result => ({
                        name: result.name,
                        country: result.country,
                        latitude: result.latitude,
                        longitude: result.longitude,
                    }));
                }).catch((error) => {
                    console.error("Error during the recovery of the suggestions:", error);
                });
            } else {
                this.suggestions = [];
            }
        },

        selectCity(city) {
            this.selectedCity = city;
            this.cityQuery = `${city.name}, ${city.country}`;
            this.suggestions = [];
        },

        selectFavoriteCity(city) {
            this.selectedCity = city;
            this.cityQuery = `${city.name}, ${city.country}`;
            this.suggestions = [];
            this.fetchWeatherData();
        },

        async fetchWeatherData() {
            const [latitude, longitude] = [this.selectedCity.latitude, this.selectedCity.longitude];
            axios.get("https://api.open-meteo.com/v1/forecast", {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    hourly: "temperature_2m",
                    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
                }
            }).then((response) => {
                console.log("API response:", response.data);
                const hourlyData = response.data.hourly;
                const currentData = response.data.current;
                this.currentWeatherData = currentData;
                this.temperatureData = hourlyData.temperature_2m.slice(0, 24);
                this.labels = hourlyData.time.slice(0, 24).map(time => new Date(time).getHours() + ":00");
                console.log(this.temperatureData);
                console.log(this.labels);
            }).catch((error) => {
                console.error("Error fetching weather data:", error);
            });
        },

        getWeatherCondition(weatherCode) {
            const weatherConditions = {
                0: "Clear sky",
                1: "Mainly clear",
                2: "Partly cloudy",
                3: "Overcast",
                45: "Fog",
                48: "Depositing rime fog",
                51: "Light drizzle",
                53: "Moderate drizzle",
                55: "Dense drizzle",
                56: "Light freezing drizzle",
                57: "Dense freezing drizzle",
                61: "Slight rain",
                63: "Moderate rain",
                65: "Heavy rain",
                66: "Light freezing rain",
                67: "Heavy freezing rain",
                71: "Slight snowfall",
                73: "Moderate snowfall",
                75: "Heavy snowfall",
                77: "Snow grains",
                80: "Slight rain showers",
                81: "Moderate rain showers",
                82: "Violent rain showers",
                85: "Slight snow showers",
                86: "Heavy snow showers",
                95: "Slight thunderstorm",
                96: "Slight thunderstorm with hail",
                99: "Heavy thunderstorm with hail",
            };
            return weatherConditions[weatherCode] || "Unknown";
        },

        getWeatherIcon(weatherCode) {
            const weatherIcons = {
                0: 'fa-sun',
                1: 'fa-sun',
                2: 'fa-cloud',
                3: 'fa-cloud',
                45: 'fa-smog',
                48: 'fa-smog',
                51: 'fa-cloud-rain',
                53: 'fa-cloud-rain',
                55: 'fa-cloud-rain',
                56: 'fa-cloud-rain',
                57: 'fa-cloud-rain',
                61: 'fa-cloud-rain',
                63: 'fa-cloud-rain',
                65: 'fa-cloud-rain',
                66: 'fa-cloud-rain',
                67: 'fa-cloud-rain',
                71: 'fa-snowflake',
                73: 'fa-snowflake',
                75: 'fa-snowflake',
                77: 'fa-snowflake',
                80: 'fa-cloud-showers-heavy',
                81: 'fa-cloud-showers-heavy',
                82: 'fa-cloud-showers-heavy',
                85: 'fa-snowflake',
                86: 'fa-snowflake',
                95: 'fa-poo-storm',
                96: 'fa-poo-storm',
                99: 'fa-poo-storm',
            };
            return weatherIcons[weatherCode] || 'fa-question';
        },

        async fetchWeatherForFavoriteCities() {
            const requests = this.favoriteCities.map(city => {
                return axios.get("https://api.open-meteo.com/v1/forecast", {
                    params: {
                        latitude: city.latitude,
                        longitude: city.longitude,
                        hourly: "temperature_2m",
                        current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
                    }
                }).then(response => {
                    return {
                        city: city,
                        weather: response.data.current,
                    };
                });
            });
            try {
                const results = await Promise.all(requests);
                this.favoriteWeatherData = results;
                this.initialFavoriteWeatherData = [...results]; // Save initial order
                console.log(this.favoriteWeatherData);
            } catch (error) {
                console.error("Error fetching weather data for favorite cities:", error);
            }
        },

        toggleFavoriteCity() {
            const favCity = {
                name: this.selectedCity.name,
                country: this.selectedCity.country,
                latitude: this.selectedCity.latitude,
                longitude: this.selectedCity.longitude,
            };
            const isFavoriteIndex = this.favoriteCities.findIndex(city =>
                city.latitude === favCity.latitude && city.longitude === favCity.longitude
            );
            if (isFavoriteIndex === -1) {
                this.favoriteCities.push(favCity);
            } else {
                this.favoriteCities.splice(isFavoriteIndex, 1);
            }
            this.saveFavoriteCities();
            this.loadFavoriteCities();
        },

        saveFavoriteCities() {
            localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
        },

        loadFavoriteCities() {
            const favoriteCities = localStorage.getItem('favoriteCities');
            if (favoriteCities) {
                this.favoriteCities = JSON.parse(favoriteCities);
                this.fetchWeatherForFavoriteCities();
            }
        },

        sortFavoriteCities() {
            this.favoriteWeatherData.sort((a, b) => this.isSortedAsc ? a.weather.temperature_2m - b.weather.temperature_2m : b.weather.temperature_2m - a.weather.temperature_2m);
            this.isSortedAsc = !this.isSortedAsc; // Toggle sort order
        },

        resetFavoriteCitiesOrder() {
            this.favoriteWeatherData = [...this.initialFavoriteWeatherData]; // Reset to initial order
        }
    },

    mounted() {
        this.loadFavoriteCities();
        console.log(this.favoriteCities);
    }
};

</script>

<template>
    <main class="search-form container mt-4">
        <div class="row">
            <div class="left-panel col-md-12 col-lg-5 mb-4">
                <!-- Favorite Cities Table -->
                <div class="favorite-weather">
                    <h3 class="section-title text-center">
                        Favorite Cities
                    </h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <table class="table table-hover border rounded">
                            <thead>
                                <tr>
                                    <th>Cuty</th>
                                    <th>Country</th>
                                    <th>
                                        Temperature
                                        <button class="btn btn-primary btn-sort" @click="sortFavoriteCities">
                                            <font-awesome-icon
                                                :icon="isSortedAsc ? 'fa-sort-amount-down' : 'fa-sort-amount-up'" />
                                        </button>
                                    </th>
                                    <th>Weather</th>
                                </tr>
                            </thead>
                            <tbody v-if="favoriteWeatherData.length">
                                <tr v-for="(city, index) in favoriteWeatherData" :key="index"
                                    @click="selectFavoriteCity(city.city)" style="cursor: pointer;">
                                    <td>{{ city.city.name }}</td>
                                    <td>{{ city.city.country }}</td>
                                    <td>{{ city.weather.temperature_2m }} °C</td>
                                    <td>{{ getWeatherCondition(city.weather.weather_code) }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">There are no favorite cities yet</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="right-panel col-md-12 col-lg-7 order-md-0">
                <!-- Search Form -->
                <form class="row mb-3" @submit.prevent>
                    <div class="col-10">
                        <input type="text" class="form-control" id="inputCity" aria-describedby="inputCity"
                            placeholder="Type the city" v-model="cityQuery" @input="fetchCitySuggestions">
                        <ul class="list-group mt-1" v-if="suggestions.length">
                            <li v-for="(suggestion, index) in suggestions"
                                :key="suggestion.name + suggestion.country + index"
                                class="list-group-item list-group-item-action" @click="selectCity(suggestion)">
                                {{ suggestion.name }}, {{ suggestion.country }}
                            </li>
                        </ul>
                    </div>
                    <button type="submit" class="btn btn-primary col-2" @click="fetchWeatherData">Submit</button>
                </form>

                <!-- Current weather data -->
                <div class="card mb-4" v-if="currentWeatherData">
                    <div class="card-body">
                        <h5 class="card-title">Weather Data for {{ selectedCity.name }}</h5>
                        <p class="card-text"><strong>Temperature:</strong> {{ currentWeatherData.temperature_2m }} °C
                        </p>
                        <p class="card-text"><strong>Wind Speed:</strong> {{ currentWeatherData.wind_speed_10m }} km/h
                        </p>
                        <p class="card-text"><strong>Humidity:</strong> {{ currentWeatherData.relative_humidity_2m }} %
                        </p>
                        <p class="card-text">
                            <strong>Condition:</strong>
                            {{ getWeatherCondition(currentWeatherData.weather_code) }}
                            <font-awesome-icon :icon="getWeatherIcon(currentWeatherData.weather_code)" />
                        </p>
                        <p class="card-text"><strong>Time:</strong> {{ currentWeatherData.time }}</p>
                    </div>
                    <div class="card-footer text-center">
                        <font-awesome-icon
                            :icon="favoriteCities.some(city => city.latitude === selectedCity.latitude && city.longitude === selectedCity.longitude) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                            @click="toggleFavoriteCity" class="favorite-icon" />
                    </div>
                </div>

                <!-- Temperature's graph -->
                <div class="">
                    <TemperatureChart :temperatureData="temperatureData" :labels="labels" />
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.favorite-weather {
    padding: 1.5rem;
    background-color: #f7fdfe;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    overflow-x: auto;

    .section-title {
        font-size: 1.8rem;
        font-weight: bold;
        color: #007bff;
        margin-bottom: 1rem;
    }

    .favorite-table {
        overflow-y: auto;

        th {
            background-color: #0096ff;
            color: #ffffff;
            font-weight: bold;
        }

        tr:hover {
            background-color: #e6f7ff;
        }

        .btn-sort {
            background-color: #007bbd;
            border-color: #007bbd;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #005a8d;
            }
        }
    }
}

.search-form {
    padding: 2rem;
    background-color: #f0f4f8;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);

    .form-control {
        border-radius: 8px;
        border: 1px solid #a0aec0;

        &:focus {
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
            border-color: #007bff;
        }
    }

    .list-group-item {
        cursor: pointer;

        &:hover {
            background-color: #e2e8f0;
        }
    }

    .btn-primary {
        background-color: #0096ff;
        border-color: #0096ff;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #007bbd;
        }

        border-radius: 8px;
    }

    .card {
        border-radius: 15px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        background: linear-gradient(135deg, #e0f7fa, #ffffff);

        .card-body {
            padding: 1.5rem;
            text-align: center;
        }

        .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #007bff;
        }

        .card-text {
            font-size: 1.1rem;
            color: #4a5568;
        }
    }

    .favorite-icon {
        font-size: 1.6rem;
        color: #ff4757;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
            color: #ff6b81;
        }
    }

    .table {
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;

        th,
        td {
            text-align: center;
            vertical-align: middle;
            padding: 0.75rem;
        }

        th {
            background-color: #0096ff;
            color: #ffffff;
            font-weight: bold;
        }

        tr:hover {
            background-color: #e6f7ff;
        }

        .btn {
            padding: 0.3rem 0.6rem;
            color: #ffffff;
        }
    }
}
</style>