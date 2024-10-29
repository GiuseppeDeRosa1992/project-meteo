<script>
import store from '../data/store.js';

export default {
    name: 'AppTableMeteo',

    data() {
        return {
            store,
        }
    },

    methods: {

    },

    mounted() {

    }
}
</script>

<template>
    <div class="container">
        <div class="table-responsive py-5 my-5">
            <h2>dati Correnti</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Ora</th>
                        <th scope="col">Temperatura</th>
                        <th scope="col">Condizioni Meteo</th>
                        <th scope="col">Umidità</th>
                        <th scope="col">Vento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="">
                        <td>
                            {{ store.queryResult.current.time.slice(11) }}
                        </td>

                        <td>
                            {{ store.queryResult.current.temperature_2m }}
                            {{ store.queryResult.current_units.temperature_2m }}
                        </td>

                        <td>
                            {{ store.queryResult.current.weather_code }}
                            {{ store.queryResult.current_units.weather_code }}
                        </td>

                        <td>
                            {{ store.queryResult.current.relative_humidity_2m }}
                            {{ store.queryResult.current_units.relative_humidity_2m }}
                        </td>

                        <td>
                            {{ store.queryResult.current.wind_speed_10m }}
                            {{ store.queryResult.current_units.wind_speed_10m }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-responsive py-5 my-5">
            <h2>dati Giornalieri</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Ora</th>
                        <th scope="col">Temperatura</th>
                        <th scope="col">Condizioni Meteo</th>
                        <th scope="col">Umidità</th>
                        <th scope="col">Vento</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="riga, i in 24">
                        <tr class="">
                            <td>
                                {{ store.queryResult.hourly.time[i].slice(11) }}
                            </td>

                            <td>
                                {{ store.queryResult.hourly.temperature_2m[i] }}
                                {{ store.queryResult.current_units.temperature_2m }}
                            </td>

                            <td>
                                {{ store.queryResult.hourly.weather_code[i] }}
                                {{ store.queryResult.current_units.weather_code }}
                            </td>

                            <td>
                                {{ store.queryResult.hourly.relative_humidity_2m[i] }}
                                {{ store.queryResult.current_units.relative_humidity_2m }}
                            </td>

                            <td>
                                {{ store.queryResult.hourly.wind_speed_10m[i] }}
                                {{ store.queryResult.current_units.wind_speed_10m }}
                            </td>

                        </tr>
                    </template>
                    <!-- <td>{{ hourWeather }} {{
                        store.queryResult.current_units.temperature_2m }}</td>
                    <td>{{ }} {{
                        store.queryResult.current_units.weather_code
                    }}</td>
                    <td>{{ }} {{
                        store.queryResult.current_units.relative_humidity_2m }}</td>
                    <td>{{ }} {{
                        store.queryResult.current_units.wind_speed_10m }}</td> -->
                </tbody>
            </table>
        </div>
    </div>


</template>

<style scoped></style>