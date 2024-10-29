<script>
import axios from 'axios';
import store from '../data/store.js';

export default {
    name: 'AppHeader',

    data() {
        return {
            store,
            city: [],
        }
    },

    methods: {
        searchCityMeteo() {
            if (store.query.length > 2) {
                axios
                    .get(store.baseUrlApiTomTom + store.query + '.json', { params: store.params })
                    .then(response => {

                        this.city = response.data.results;

                    })
                    .catch(error => {
                        console.error('Errore nella richiesta:', error);
                    });
            }

        },

        selectedCity(name, latitude, longitude) {
            store.queryMeteo = {
                cityName: name,
                cityLatitude: latitude,
                cityLongitude: longitude,
            }
            console.log(store.queryMeteo)
        },

        resultCity() {
            axios
                .get(`https://api.open-meteo.com/v1/forecast?latitude=${store.queryMeteo.cityLatitude}&longitude=${store.queryMeteo.cityLongitude}&${store.queryParams}`)
                .then(response => {
                    store.queryResult = response.data
                    console.log(store.queryResult)
                })
        }
    },
}
</script>

<template>
    <header class="bg-primary">
        <div class="container">
            <div class="py-2 row m-0 justify-content-between align-items-center">
                <h2 class="m-0 py-2 col-auto">Cerca il Meteo</h2>
                <div class="m-0 py-2 col-auto position-relative">
                    <input type="text" list="city" name="city" id="" placeholder="Nome della Città"
                        @input="searchCityMeteo()" v-model="store.query">
                    <div class="bg-white position-absolute top-25 left-25" id="city">
                        <template v-for="singleCity in city">
                            <p
                                @click="selectedCity(singleCity.address.municipality, singleCity.position.lat, singleCity.position.lon)">
                                {{ singleCity.address.municipality + ' ' + singleCity.address.countrySubdivision + ' ' +
                                    singleCity.address.countryCode }}
                            </p>
                        </template>
                    </div>
                    <button type="submit" class="px-2 py-2 ms-2 rounded-2" @click="resultCity()">Cerca</button>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped></style>