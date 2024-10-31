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

    queryResult: null,

    city: [],

    resultQueryMeteo: {},

    recordCity: JSON.parse(localStorage.getItem("city")) || [],

    cityIndex: "",

    starClass: "fa-regular fa-star",

    data: {
        labels: "",
        datasets: [{
            label: 'Statistiche Temperatura',
            data: "",
            borderWidth: 2,
            borderColor: '2 px solid black',
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        return 'Ore: ' + tooltipItems[0].label;
                    },

                    label: function (tooltipItem) {
                        return 'Temperatura: ' + tooltipItem.formattedValue + '℃';
                    },
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Ore"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Gradi (℃)",
                }
            }
        }
    }

});

export default myData;