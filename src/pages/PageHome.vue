<script>
import axios from 'axios';

export default {
    data() {
        return {
            cityQuery: "",
            suggestions: [],
            selectedCity: null,
            currentWeatherData: null,
            hourlyWeatherData: null,
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
                    }))
                }).catch((error) => {
                    console.error("Error during the recovery of the suggestions:", error);
                });
            } else {
                this.suggestions = [];
            }
        },

        selectCity(suggestion) {
            this.selectedCity = suggestion;
            this.suggestions = [];
            this.cityQuery = `${suggestion.name}, ${suggestion.country}`;
            this.fetchWeatherData(suggestion.latitude, suggestion.longitude);
        },

        async fetchWeatherData(latitude, longitude) {
            axios.get("https://api.open-meteo.com/v1/forecast", {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    hourly: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
                    current_weather: true,
                }
            }).then((response) => {
                console.log(response.data);
                this.currentWeatherData = response.data.current_weather;
                this.hourlyWeatherData = response.data.hourly;      
            }).catch((error) => {
                console.error("Error fetching weather data:", error);
            })
        },

        getWeatherCondition(weatherCode) {
            const weatherConditions = {
                0: "Clear sky",
                1: "Mainly clear",
                2: "Partly cloudy",
                3: "Overcast",
            };
            return weatherConditions[weatherCode] || "Unknown";
        }
    }
};
</script>

<template>
    <div class="search-form">
        <form>
            <div class="mb-3">
                <label for="inputCity" class="form-label">Type the city</label>
                <input type="text" class="form-control" id="inputCity" aria-describedby="inputCity"
                    placeholder="ex: Milano" v-model="cityQuery" @input="fetchCitySuggestions">

                <ul v-if="suggestions.length">
                    <li v-for="suggestion in suggestions" :key="suggestion.name + suggestion.country"
                        @click="selectCity(suggestion)">
                        {{ suggestion.name }}, {{ suggestion.country }}
                    </li>
                </ul>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <div v-if="currentWeatherData">
            <h2>Weather Data for {{ selectedCity.name }}</h2>
            <p><strong>Temperature:</strong> {{ currentWeatherData.temperature }} °C</p>
            <p><strong>Wind Speed:</strong> {{ currentWeatherData.windspeed }} km/h</p>
            <p><strong>Wind Direction:</strong> {{ currentWeatherData.winddirection }} °</p>
            <p><strong>Condition:</strong> {{ getWeatherCondition(currentWeatherData.weathercode) }}</p>
            <p><strong>Time:</strong> {{ currentWeatherData.time }}</p>
        </div>

        <div v-if="hourlyWeatherData">
            <h3>Hourly Weather Forecast</h3>
            <ul>
                <li v-for="(temp, index) in hourlyWeatherData.temperature_2m" :key="index">
                    <strong>{{ hourlyWeatherData.time[index] }}</strong> - {{ temp }} °C
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>