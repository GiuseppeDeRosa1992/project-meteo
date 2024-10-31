import { reactive } from "vue";

const myData = reactive({
    //variabile per v-model di input
    query: "",
    //variabile per la funzione resultCity
    queryParams: "current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&forecast_days=1",

    //variabile per la baseUrl di tom tom
    baseUrlApiTomTom: "https://api.tomtom.com/search/2/search/",

    //parametri da passare nella chiamata axios di tom tom
    params: {
        key: 'ozY53364svBj7wjORXUDYf84u6yF8YYJ',
        typeahead: true,
        idxSet: 'Geo',
        limit: 5,
    },

    queryMeteo: {},

    queryResult: null,

    //variabile per il banner sotto input delle città che mi trova a ogni lettera che scrivo
    city: [],

    resultQueryMeteo: {},

    //variabile per settare il lcoalStorage
    recordCity: JSON.parse(localStorage.getItem("city")) || [],

    cityIndex: "",

    starClass: "fa-regular fa-star",


    //dati per il grafico
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