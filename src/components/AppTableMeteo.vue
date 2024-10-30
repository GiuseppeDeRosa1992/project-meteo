<script>
import store from '../data/store.js';
import axios from 'axios';

export default {
    name: 'AppTableMeteo',

    data() {
        return {
            store,
        }
    },

    methods: {

        weatherIcon(condition) {
            if (condition == 0) {
                return 'fa-solid fa-sun text-warning'
            } else if (condition >= 1 && condition <= 44) {
                return 'fa-solid fa-cloud-sun text-secondary'
            } else if (condition >= 45) {
                return 'fa-solid fa-cloud-rain text-primary'
            }

        },

        preferiteCity() {
            let cityExist = false;
            if (store.recordCity.length == 0) {
                store.recordCity.push(store.queryMeteo)
                localStorage.setItem("city", JSON.stringify(store.recordCity));
                console.log('pucciotto')
            } else {
                store.recordCity.forEach(element => {
                    if (element.cityLongitude == store.queryMeteo.cityLongitude) {
                        cityExist = true;
                        console.log('ciao')
                    }
                });
                if (!cityExist) {
                    store.recordCity.push(store.queryMeteo)
                    localStorage.setItem("city", JSON.stringify(store.recordCity));
                    console.log('pucciotto 2')
                }
            }
            console.log(store.recordCity)
        },

        resultPreferiteCity(latitude, longitude, name) {
            axios
                .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${store.queryParams}`)
                .then(response => {
                    store.queryResult = response.data
                    console.log(store.queryResult)
                });

            store.currentCityName = name;
        },

    }
}

</script>

<template>
    <div class="container">
        <h3 class="m-0 py-2 text-center">Città Preferite:
            <template v-for="city in store.recordCity">
                <span @click="resultPreferiteCity(city.cityLatitude, city.cityLongitude, city.cityName)"
                    class="badge bg-primary mx-1">{{ city.cityName }}, {{ city.cityCountryCode }}</span>
            </template>
        </h3>
        <div class="table-responsive" v-if="store.queryResult">
            <h2 class="py-4 m-0 text-center">Città scelta: {{ store.currentCityName }}
                <i @click="preferiteCity()" class="fa-regular fa-star" style="color: #FFD43B;"></i>
            </h2>
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
                            <i :class="weatherIcon(store.queryResult.current.weather_code)"></i>
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

        <div class="table-responsive py-5 my-5" v-if="store.queryResult">
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
                                <i :class="weatherIcon(store.queryResult.hourly.weather_code[i])"></i>
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
                </tbody>
            </table>
        </div>
    </div>


</template>

<style scoped>
i {
    cursor: pointer;
}
</style>