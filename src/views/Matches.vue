<template>
    <div class="flex flex-col items-center gap-8">
        <!-- active matches -->
        <div class="flex w-full flex-col items-center gap-4">
            <router-link
                v-for="match in activeMatches"
                :key="match.id"
                :to="`/matchdetails/${match.id}`"
                class="match-details flex w-full flex-col items-center gap-2 overflow-hidden rounded-xl px-4 pb-3"
            >
                <!-- match status -->
                <span
                    class="info-tag rounded-b-lg px-2 py-1 text-xs font-bold text-[#fff]"
                    :class="`status-${match.status}`"
                    >{{
                        `${statusText(match.status)} ${match.startTime} ID:${
                            match.id
                        }`
                    }}</span
                >
                <!-- match info -->
                <div class="flex items-center gap-6">
                    <span class="text-lg font-bold italic text-[#fff]">{{
                        match.white
                    }}</span>
                    <span class="text-[#fff]">vs</span>
                    <span class="text-lg font-bold italic text-[#fff]">{{
                        match.red
                    }}</span>
                </div>
                <!-- bet button -->
                <button
                    class="match-btn flex h-8 items-center justify-center rounded-lg px-6 text-xs font-bold text-[#fff]"
                    :class="`status-${match.status}`"
                >
                    {{ matchBtnText(match.status) }}
                </button>
            </router-link>
        </div>
        <!-- over matches -->
        <div class="flex w-full flex-col gap-4">
            <span class="text-[40px] font-bold">History</span>
            <div class="flex w-full flex-col gap-4">
                <router-link
                    v-for="match in overMatches"
                    :key="match.id"
                    :to="`/matchdetails/${match.id}`"
                    class="match-details flex w-full flex-col items-center gap-2 overflow-hidden rounded-xl px-4 pb-3"
                >
                    <!-- match status -->
                    <span
                        class="info-tag rounded-b-lg px-2 py-1 text-xs font-bold text-[#fff]"
                        :class="`status-${match.status}`"
                        >{{
                            `${statusText(match.status)} ${
                                match.startTime
                            } ID:${match.id}`
                        }}</span
                    >
                    <!-- match info -->
                    <div class="flex items-center gap-6">
                        <span class="text-lg font-bold italic text-[#fff]">{{
                            match.white
                        }}</span>
                        <span class="text-[#fff]">vs</span>
                        <span class="text-lg font-bold italic text-[#fff]">{{
                            match.red
                        }}</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Bet",
    data: () => ({
        matches: [
            {
                id: 240202,
                status: 0, // 0: 未開始1可下注
                startTime: "2022-08-09 20:00:00 UTC+0",
                white: "Romans",
                red: "Knights",
            },
            {
                id: 240203,
                status: 1, // 1: 未開始不可下注
                startTime: "2022-08-09 20:00:00 UTC+0",
                white: "Romans",
                red: "Knights",
            },
            {
                id: 240204,
                status: 2, // 2: 已開始
                startTime: "2022-08-09 20:00:00 UTC+0",
                white: "Romans",
                red: "Knights",
            },
            {
                id: 240205,
                status: 3, // 3: 已結束
                startTime: "2022-08-09 20:00:00 UTC+0",
                white: "Romans",
                red: "Knights",
            },
            {
                id: 240206,
                status: 3, // 3: 已結束
                startTime: "2022-08-09 20:00:00 UTC+0",
                white: "Romans",
                red: "Knights",
            },
        ],
    }),
    computed: {
        activeMatches() {
            return this.matches.filter((match) => match.status < 3);
        },
        overMatches() {
            return this.matches.filter((match) => match.status === 3);
        },
    },
    methods: {
        statusText(statusCode) {
            switch (statusCode) {
                case 0:
                    return "To begin:";
                case 1:
                    return "To begin:";
                case 2:
                    return "Live";
                case 3:
                    return "";
            }
        },
        matchBtnText(statusCode) {
            switch (statusCode) {
                case 0:
                    return "Bet Now";
                case 1:
                    return "Bet Now";
                case 2:
                    return "Watch Stream";
                case 3:
                    return "";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.match-details {
    background-size: cover;
    background-position: center;
    background-image: url("/public/assets/imgs/views/matches/match-bg.png");

    .info-tag {
        &.status-0,
        &.status-1 {
            background: #ff9901;
        }
        &.status-2 {
            background: #26d738;
        }
        &.status-3 {
            background: rgba($color: #000000, $alpha: 0.64);
        }
    }

    .match-btn {
        &.status-0,
        &.status-1 {
            background: linear-gradient(92deg, #184cff 5.53%, #ff3838 94.47%);
        }
        &.status-2 {
            background: #26d738;
        }
    }
}
</style>
