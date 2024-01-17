<template>
    <div>
        <div v-if="weatherData || aqiData" class="row">
            <p v-if="weatherData.current_weather">
                <span> {{ weatherData.current_weather.temperature }}</span>
                <span> <img src="/icons/degree.svg" alt="degrees Fahrenheit symbol">
                </span>
            </p>
            <p v-if="weatherData.current_weather" class="hide-on-mobile">
                <span>
                    {{ weatherData.current_weather.windspeed }}
                </span>
                <span>{{ windspeedDirection }}</span>
            </p>
            <p v-if="aqiData.hourly">
                <span>{{ aqiData.hourly.us_aqi[0] }}</span>
                <span>AQI</span>
            </p>
        </div>
    </div>
</template>
<script setup>

const props = defineProps(['data'])
const today = new Date().toISOString().split('T')[0]

const weatherQuery = `https://api.open-meteo.com/v1/forecast?latitude=${props.data.lat}&longitude=${props.data.lng}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`
const aqiQuery = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${props.data.lat}&longitude=${props.data.lng}&hourly=us_aqi&start_date=${today}&end_date=${today}`

const weatherData = ref();
const aqiData = ref();
const windspeedDirection = ref();

const setWindspeedDirection = (radian) => {
    if ((348.75 < radian && radian < 360) || (0 < radian && radian < 11.25)) {
        return 'N'
    } else if (11.25 < radian && radian < 78.75) {
        return 'NE'
    } else if (78.75 < radian && radian < 101.25) {
        return 'E'
    } else if (101.25 < radian && radian < 168.75) {
        return 'SE'
    } else if (168.75 < radian && radian < 191.25) {
        return 'S'
    } else if (191.25 < radian && radian < 258.75) {
        return 'SW'
    } else if (258.75 < radian && radian < 281.25) {
        return 'W'
    } else if (281.25 < radian && radian < 348.75) {
        return 'NW'
    }
}
if (process.client) {
    weatherData.value = await fetch(weatherQuery)
        .then(res => res.json())
        .then(result => {
            windspeedDirection.value = setWindspeedDirection(result?.current_weather.winddirection);
            return result
        });

    aqiData.value = await fetch(aqiQuery).then(res => res.json())
        .then(result => {
            return result
        });
}


</script>
<style lang="scss" scoped>
.row {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: $collapse-bp) {
        justify-content: flex-end;

        p:last-child {
            margin-left: 1ch;
        }
    }

}

p {
    display: flex;

    // >*:last-child {
    //     margin-left: 1ch;
    // }
}



.row>* {
    @media (min-width: $collapse-bp) {
        margin-right: 3ch;

    }
}

.hide-on-mobile {
    @media (max-width: $collapse-bp) {
        display: none;
    }
}
</style>