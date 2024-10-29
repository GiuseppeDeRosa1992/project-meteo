import { reactive } from "vue";

const myData = reactive({
    query: "",
    queryParams: "current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&forecast_days=1",
    baseUrlApiTomTom: "https://api.tomtom.com/search/2/search/",
    params: {
        key: 'ozY53364svBj7wjORXUDYf84u6yF8YYJ',
        typeahead: true,
        idxSet: 'Geo',
        limit: 5,
    },

    queryMeteo: {},

    queryResult: {},
});

export default myData;