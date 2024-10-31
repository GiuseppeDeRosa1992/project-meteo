<script>
import store from '../data/store.js';
import Function from '../data/function.js';
import axios from 'axios';
export default {
    name: 'AppTableMeteo',

    components: {
    },

    data() {
        return {
            store,
            Function,
        }
    },

    methods: {

        //funzione che mi prende i dati longitudine e latitudine da tom tom e i params, e gli passo con il v-model il dato che scrivo nell' input
        searchCityMeteo() {
            if (store.query.length > 2) {
                axios
                    .get(store.baseUrlApiTomTom + store.query + '.json', { params: store.params })
                    .then(response => {

                        store.city = response.data.results;

                    })
                    .catch(error => {
                        console.error('Errore nella richiesta:', error);
                    });
            }
        },

        //funzione che da il display none all'elemento con id city
        dNone() {
            document.getElementById('city').classList.add('d-none');
        },

        //funzione che da il display block all'elemento con id city
        dBlock() {
            document.getElementById('city').classList.remove('d-none');
        },

        //funzione con diversi argomenti che salvo in queryMeteo, che dopo richiamo nella funzione resultcity
        selectedCity(name, latitude, longitude, countrySubdivision, countryCode) {
            store.queryMeteo = {
                cityName: name,
                cityLatitude: latitude,
                cityLongitude: longitude,
                cityCountrySubdivision: countrySubdivision,
                cityCountryCode: countryCode
            }
            this.dNone();
            store.query = store.queryMeteo.cityName + ', ' + store.queryMeteo.cityCountrySubdivision + ', ' + store.queryMeteo.cityCountryCode;
            console.log(store.queryMeteo)
        },

        //chiamata axios che mi restituisce i dati quando clicco su cerca nell'header
        resultCity() {
            axios
                .get(`https://api.open-meteo.com/v1/forecast?latitude=${store.queryMeteo.cityLatitude}&longitude=${store.queryMeteo.cityLongitude}&${store.queryParams}`)
                .then(response => {
                    store.queryResult = response.data;
                    let time = store.queryResult.hourly.time;
                    let hours = time.map(time => {
                        let date = new Date(time);
                        let updateDate = date.getHours();
                        if (updateDate <= 9) {
                            updateDate = "0" + updateDate + ":00";
                            return updateDate;
                        }
                        return updateDate + ":00";
                    });

                    store.data.labels = hours;
                    store.data.datasets[0].data = store.queryResult.hourly.temperature_2m;
                    Function.renderChart(this.$refs.chartMeteo);
                });
            store.city = [];

            store.resultQueryMeteo = store.queryMeteo;
            store.query = "";

        },

        // Passa una icona a ogni condizione meteo
        weatherIcon(condition) {
            if (condition == 0) {
                return 'fa-solid fa-sun text-warning'
            } else if (condition >= 1 && condition <= 44) {
                return 'fa-solid fa-cloud-sun text-secondary'
            } else if (condition >= 45) {
                return 'fa-solid fa-cloud-rain text-primary'
            }

        },

        //Se la città è tra i preferiti allora aggiunge il cestino elimina, sennò viene mostrata solo la stella vuota
        visibilityTrash() {
            let cityExist = false;
            store.recordCity.forEach(element => {
                if (element.cityLongitude == store.resultQueryMeteo.cityLongitude) {
                    cityExist = true;
                }
            });
            return cityExist;
        },

        //Se la ciità viene aggiunta ai preferiti allora la stellina è piena sennò se la città non è tra i preferiti la stellina è vuota
        visibilityStar() {
            let cityExist = false;
            store.recordCity.forEach(element => {
                if (element.cityLongitude == store.resultQueryMeteo.cityLongitude) {
                    cityExist = true;
                }
            });
            if (!cityExist) {
                return "fa-regular fa-star";
            } else {
                return "fa-solid fa-star";
            }
        },

        // Funzione per aggiungere la città al localStorage e ai preferiti
        preferiteCity() {
            let cityExist = false;
            if (store.recordCity.length == 0) {
                store.recordCity.push(store.resultQueryMeteo);
                localStorage.setItem("city", JSON.stringify(store.recordCity));
            } else {
                store.recordCity.forEach(element => {
                    if (element.cityLongitude == store.resultQueryMeteo.cityLongitude) {
                        cityExist = true;
                    }
                });
                if (!cityExist) {
                    store.recordCity.push(store.resultQueryMeteo);
                    localStorage.setItem("city", JSON.stringify(store.recordCity));
                    store.cityIndex = store.recordCity.length - 1;
                }
            }
        },

        // Al click sul cestino elimina una città dal localStorage e dai preferiti
        deleteCity() {
            store.recordCity.splice(store.cityIndex, 1);
            localStorage.setItem("city", JSON.stringify(store.recordCity));
        },

        // Chiamata axios che restituisce i dati della città che sta nei preferiti che viene cliccata
        resultPreferiteCity(city, indice) {
            axios
                .get(`https://api.open-meteo.com/v1/forecast?latitude=${city.cityLatitude}&longitude=${city.cityLongitude}&${store.queryParams}`)
                .then(response => {
                    store.queryResult = response.data;
                    let time = store.queryResult.hourly.time;
                    let hours = time.map(time => {
                        let date = new Date(time);
                        let updateDate = date.getHours();
                        if (updateDate <= 9) {
                            updateDate = "0" + updateDate + ":00";
                            return updateDate;
                        }
                        return updateDate + ":00";
                    });

                    store.data.labels = hours;
                    store.data.datasets[0].data = store.queryResult.hourly.temperature_2m;

                    Function.renderChart(this.$refs.chartMeteo);
                });

            store.resultQueryMeteo = city;
            store.cityIndex = indice;
        },
    },

    mounted() {

    }
}

</script>

<template>

    <header class="bg-primary">
        <div class="py-2 row m-0 justify-content-between align-items-center">
            <h2 class="col-12 text-center m-0 py-2 col-md-7 text-md-start">Cerca il Meteo della tua Città</h2>
            <div class="col-auto text-center m-0 py-2 col-md-auto text-md-end position-relative">
                <input type="text" list="city" name="city" id="" placeholder="Nome della Città" @click="dBlock()"
                    @input="searchCityMeteo()" v-model="store.query">
                <div class="bg-white position-absolute top-25 text-start" id="city">
                    <template v-for="singleCity in store.city">
                        <p
                            @click="selectedCity(singleCity.address.municipality, singleCity.position.lat, singleCity.position.lon, singleCity.address.countrySubdivision, singleCity.address.countryCode)">
                            {{ singleCity.address.municipality + ', ' + singleCity.address.countrySubdivision + ', '
                                + singleCity.address.countryCode }}
                        </p>
                    </template>
                </div>
                <button type="submit" class="px-2 py-2 ms-2 rounded-2" @click="resultCity()">Cerca</button>
            </div>
        </div>
    </header>
    <main>
        <section>
            <div class="container">
                <h3 class="mb-0 mt-5 mt-sm-0 pt-5 py-sm-2 text-center">Città Preferite:
                    <template v-for="city, i in store.recordCity">
                        <span @click="resultPreferiteCity(city, i)" class="badge bg-primary m-1">{{ city.cityName }}, {{
                            city.cityCountryCode }}</span>
                    </template>
                </h3>
                <div class="table-responsive text-center" v-if="store.queryResult">
                    <h2 class="py-2 py-md-5 m-0 text-center">Città scelta:
                        {{ store.resultQueryMeteo.cityName }},
                        {{ store.resultQueryMeteo.cityCountrySubdivision }},
                        {{ store.resultQueryMeteo.cityCountryCode }}

                        <i @click="preferiteCity()" :class="visibilityStar()" style="color: #FFD43B;"></i>

                        <i v-if="visibilityTrash()" @click="deleteCity()" class="fa-regular fa-trash-can ms-3"
                            style="color: #ff0000;">
                        </i>
                    </h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Ora</th>
                                <th scope="col">Temperatura</th>
                                <th scope="col">Condizioni Meteo</th>
                                <th scope="col">Umidità</th>
                                <th scope="col" class="d-none d-sm-block">Vento</th>
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

                                <td class="d-none d-sm-block">
                                    {{ store.queryResult.current.wind_speed_10m }}
                                    {{ store.queryResult.current_units.wind_speed_10m }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-responsive py-5 mt-5 text-center" v-if="store.queryResult">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Ora</th>
                                <th scope="col">Temperatura</th>
                                <th scope="col">Condizioni Meteo</th>
                                <th scope="col">Umidità</th>
                                <th scope="col" class="d-none d-sm-block">Vento</th>
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

                                    <td class="d-none d-sm-block">
                                        {{ store.queryResult.hourly.wind_speed_10m[i] }}
                                        {{ store.queryResult.current_units.wind_speed_10m }}
                                    </td>

                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <div class="pb-5">
                    <canvas ref="chartMeteo"></canvas>
                </div>
            </div>
        </section>
    </main>



</template>

<style scoped>
i,
span {
    cursor: pointer;
}
</style>