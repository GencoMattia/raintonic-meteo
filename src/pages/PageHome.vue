<script>
import axios from 'axios';

export default {
    data() {
        return {
            cityQuery: "",
            suggestions: [],
            selectedCity: null,
        };
    },

    methods: {
        async fetchCitySuggestions() {
            if (this.cityQuery.length > 2) {
                axios.get("https://geocoding-api.open-meteo.com/v1/search", {
                    params: {
                        name : this.cityQuery,
                        count : 5,
                        format: "json",
                        language: "en",
                    }
                }).then((response) => [
                    this.suggestions = response.data.results.map(result => ({
                        name: result.name,
                        country: result.country,
                        latitude: result.latitude,
                        longitude: result.longitude,
                    }))
                ]).catch((error) => {
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
    </div>
</template>

<style lang="scss" scoped></style>