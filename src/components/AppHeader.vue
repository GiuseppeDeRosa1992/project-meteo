<script>
import axios from 'axios';
import store from '../data/store.js';

export default {
    name: 'AppHeader',

    data() {
        return {
            store,

        }
    },

    methods: {
        searchCityMeteo() {
            if (store.query.length > 2) {
                axios
                    .get(store.baseUrlApiTomTom + store.query + '.json', { params: store.params })
                    .then(response => {

                        this.store.city = response.data.results;

                    })
                    .catch(error => {
                        console.error('Errore nella richiesta:', error);
                    });
            }
        },

        dNone() {
            document.getElementById('city').classList.add('d-none');
        },

        dBlock() {
            document.getElementById('city').classList.remove('d-none');
        },

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

        resultCity() {
            axios
                .get(`https://api.open-meteo.com/v1/forecast?latitude=${store.queryMeteo.cityLatitude}&longitude=${store.queryMeteo.cityLongitude}&${store.queryParams}`)
                .then(response => {
                    store.queryResult = response.data
                    console.log(store.queryResult)
                });
            store.city = [];

            store.resultQueryMeteo = store.queryMeteo;
            store.query = ""
        },

    },
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
</template>

<style scoped>
p {
    cursor: pointer
}
</style>