<template>
    <div class="flex w-full flex-col items-center gap-6">
        <!-- match banner -->
        <div
            class="match-details flex h-[132px] w-full flex-col items-center overflow-hidden rounded-xl px-4 pb-3"
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
                <img
                    :src="`/assets/imgs/utils/bloodlines/${match.cocks[0].bloodline.toLowerCase()}.png`"
                    alt=""
                    class="h-[100px] w-[100px]"
                />
                <span class="text-[#fff]">vs</span>
                <img
                    :src="`/assets/imgs/utils/bloodlines/${match.cocks[1].bloodline.toLowerCase()}.png`"
                    alt=""
                    class="h-[100px] w-[100px]"
                />
            </div>
        </div>
        <!-- match details -->
        <div class="flex w-full items-start justify-center gap-4">
            <!-- white -->
            <div class="flex flex-grow flex-col items-start gap-4">
                <div class="flex gap-2">
                    <div
                        class="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full border-[1px] border-[#2252FF]"
                    >
                        <img
                            :src="`/assets/imgs/utils/bloodlines/${match.cocks[0].bloodline.toLowerCase()}.png`"
                            alt=""
                            class="h-full w-full"
                        />
                    </div>
                    <div class="flex flex-col">
                        <span
                            class="text-base font-bold italic text-[#2252FF]"
                            >{{ match.cocks[0].bloodline }}</span
                        >
                        <span
                            class="text-base font-bold italic text-[#2252FF]"
                            >{{
                                `${match.cocks[0].bloodlineWinRate * 100}%`
                            }}</span
                        >
                    </div>
                </div>
                <div
                    class="flex w-full justify-around rounded-lg bg-[#F0F0F0] p-2"
                >
                    <span class="text-xs">{{
                        `${match.cocks[0].weight}kg`
                    }}</span>
                    <span class="text-xs">{{
                        `L ${match.cocks[0].loses}`
                    }}</span>
                    <span class="text-xs">{{
                        `W ${match.cocks[0].wins}`
                    }}</span>
                </div>
            </div>
            <!-- divider -->
            <div class="h-[96px] w-[1px] bg-[#DDDFEC]"></div>
            <!-- red -->
            <div class="flex flex-grow flex-col items-end gap-4">
                <div class="flex gap-2">
                    <div class="flex flex-col items-end">
                        <span
                            class="text-base font-bold italic text-[#E84142]"
                            >{{ match.cocks[1].bloodline }}</span
                        >
                        <span
                            class="text-base font-bold italic text-[#E84142]"
                            >{{
                                `${match.cocks[1].bloodlineWinRate * 100}%`
                            }}</span
                        >
                    </div>
                    <div
                        class="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full border-[1px] border-[#E84142]"
                    >
                        <img
                            :src="`/assets/imgs/utils/bloodlines/${match.cocks[1].bloodline.toLowerCase()}.png`"
                            alt=""
                            class="h-full w-full"
                        />
                    </div>
                </div>
                <div
                    class="flex w-full justify-around rounded-lg bg-[#F0F0F0] p-2"
                >
                    <span class="text-xs">{{
                        `${match.cocks[1].weight}kg`
                    }}</span>
                    <span class="text-xs">{{
                        `L ${match.cocks[1].loses}`
                    }}</span>
                    <span class="text-xs">{{
                        `W ${match.cocks[1].wins}`
                    }}</span>
                </div>
            </div>
        </div>
        <!-- pool & odds -->
        <div class="flex w-full flex-col gap-4">
            <span class="text-sm">{{ `Pool & odds:` }}</span>
            <!-- white -->
            <button
                @click="betBtnOnclick(0)"
                class="relative flex h-[56px] w-full items-center overflow-hidden rounded-lg border-[1px] border-[#2252FF] bg-[#fff] p-2"
                :class="{
                    'gap-2 p-2': match.status === 0,
                    'gap-4 px-6 py-2': match.status !== 0,
                    'opacity-25': match.status === 3 && match.result !== 0,
                }"
                :disabled="match.status !== 0"
            >
                <img
                    src="/assets/imgs/views/matchDetails/match-winner-label.svg"
                    alt=""
                    class="absolute left-0 top-0 h-[56px]"
                    :class="{
                        hidden: match.status !== 3 || match.result !== 0,
                    }"
                />
                <!-- pool -->
                <div class="flex flex-grow flex-col items-center">
                    <span class="text-sm font-extrabold text-[#2252FF]">{{
                        match.cocks[0].bloodline
                    }}</span>
                    <div class="flex items-center gap-[2px]">
                        <span class="text-xs text-[#2252FF]">Pool:</span>
                        <img
                            class="h-[10px] w-[10px]"
                            src="/assets/imgs/utils/token/COX.svg"
                            alt=""
                        />
                        <span class="text-xs text-[#2252FF]">{{
                            Math.floor(
                                Number(match.currentPoolStatus[0].pool),
                            ).toLocaleString()
                        }}</span>
                    </div>
                </div>
                <!-- divider -->
                <div class="h-[32px] w-[1px] bg-[#DDDFEC]"></div>
                <!-- odd -->
                <span class="w-[72px] text-[32px] font-bold text-[#2252FF]">{{
                    match.currentPoolStatus[0].odd
                }}</span>
                <!-- bet button -->
                <button
                    v-show="match.status === 0"
                    class="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-[#184CFF] to-[#FF3838] px-2 text-sm font-bold text-[#FFF]"
                >
                    Bet Now
                </button>
            </button>
            <!-- draw -->
            <button
                @click="betBtnOnclick(2)"
                class="relative flex h-[56px] w-full items-center overflow-hidden rounded-lg bg-[#000] p-2"
                :class="{
                    'gap-2 p-2': match.status === 0,
                    'gap-4 px-6 py-2': match.status !== 0,
                    'opacity-25': match.status === 3 && match.result !== 2,
                }"
                :disabled="match.status !== 0"
            >
                <img
                    src="/assets/imgs/views/matchDetails/match-winner-label.svg"
                    alt=""
                    class="absolute left-0 top-0 h-[56px]"
                    :class="{
                        hidden: match.status !== 3 || match.result !== 2,
                    }"
                />
                <!-- pool -->
                <div class="flex flex-grow flex-col items-center">
                    <span class="text-sm font-extrabold text-[#FFF]">Draw</span>
                    <div class="flex items-center gap-[2px]">
                        <span class="text-xs text-[#FFF]">Pool:</span>
                        <img
                            class="h-[10px] w-[10px]"
                            src="/assets/imgs/utils/token/COX.svg"
                            alt=""
                        />
                        <span class="text-xs text-[#FFF]">{{
                            Math.floor(
                                Number(match.currentPoolStatus[2].pool),
                            ).toLocaleString()
                        }}</span>
                    </div>
                </div>
                <!-- divider -->
                <div class="h-[32px] w-[1px] bg-[#DDDFEC]"></div>
                <!-- odd -->
                <span class="w-[72px] text-[32px] font-bold text-[#FFF]">{{
                    match.currentPoolStatus[2].odd
                }}</span>
                <!-- bet button -->
                <button
                    v-show="match.status === 0"
                    class="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-[#184CFF] to-[#FF3838] px-2 text-sm font-bold text-[#FFF]"
                >
                    Bet Now
                </button>
            </button>
            <!-- red -->
            <button
                @click="betBtnOnclick(1)"
                class="relative flex h-[56px] w-full items-center overflow-hidden rounded-lg bg-[#E84142] p-2"
                :class="{
                    'gap-2 p-2': match.status === 0,
                    'gap-4 px-6 py-2': match.status !== 0,
                    'opacity-25': match.status === 3 && match.result !== 1,
                }"
                :disabled="match.status !== 0"
            >
                <img
                    src="/assets/imgs/views/matchDetails/match-winner-label.svg"
                    alt=""
                    class="absolute left-0 top-0 h-[56px]"
                    :class="{
                        hidden: match.status !== 3 || match.result !== 1,
                    }"
                />
                <!-- pool -->
                <div class="flex flex-grow flex-col items-center">
                    <span class="text-sm font-extrabold text-[#FFF]">{{
                        match.cocks[1].bloodline
                    }}</span>
                    <div class="flex items-center gap-[2px]">
                        <span class="text-xs text-[#FFF]">Pool:</span>
                        <img
                            class="h-[10px] w-[10px]"
                            src="/assets/imgs/utils/token/COX.svg"
                            alt=""
                        />
                        <span class="text-xs text-[#FFF]">{{
                            Math.floor(
                                Number(match.currentPoolStatus[1].pool),
                            ).toLocaleString()
                        }}</span>
                    </div>
                </div>
                <!-- divider -->
                <div class="h-[32px] w-[1px] bg-[#DDDFEC]"></div>
                <!-- odd -->
                <span class="w-[72px] text-[32px] font-bold text-[#FFF]">{{
                    match.currentPoolStatus[1].odd
                }}</span>
                <!-- bet button -->
                <button
                    v-show="match.status === 0"
                    class="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-[#184CFF] to-[#FF3838] px-2 text-sm font-bold text-[#FFF]"
                >
                    Bet Now
                </button>
            </button>
            <!-- total pool -->
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-[2px]">
                    <span class="text-sm">Total pool:</span>
                    <img
                        class="h-[14px] w-[14px]"
                        src="/assets/imgs/utils/token/COX.svg"
                        alt=""
                    />
                    <span class="text-sm">{{
                        totalPool(match.currentPoolStatus)
                    }}</span>
                </div>
                <span class="text-xs text-[#AAA]"
                    >According to changes in the pool, the odds may
                    fluctuate</span
                >
            </div>
        </div>
        <!-- watch stream -->
        <button
            v-show="match.status === 2"
            class="h-[56px] w-full rounded-xl bg-[#26D738] text-lg font-bold text-[#FFF]"
        >
            Watch stream
        </button>
        <Bet
            :match="match"
            :is-bet-dialog-active.sync="isBetDialogActive"
            :selected-winner="selectedWinner"
        />
    </div>
</template>

<script>
import Bet from "./components/Bet.vue";

export default {
    name: "MatchDetails",
    components: {
        Bet,
    },
    data: () => ({
        isBetDialogActive: false,
        selectedWinner: null, // 0 || 1 || 2
        match: {
            id: 240203,
            status: 0, // 1: 未開始不可下注
            startTime: "2022-08-09 20:00:00 UTC+0",
            cocks: [
                {
                    // 白方
                    bloodline: "Romans",
                    bloodlineWinRate: 0.8,
                    weight: 6.2,
                    wins: 55,
                    loses: 12,
                },
                {
                    // 紅方
                    bloodline: "Knights",
                    bloodlineWinRate: 0.2,
                    weight: 6.2,
                    wins: 55,
                    loses: 12,
                },
            ],
            currentPoolStatus: {
                0: {
                    // 白方
                    pool: 9999999.93981,
                    odd: 5.87,
                },
                1: {
                    // 紅方
                    pool: 8888888.19278,
                    odd: 3.87,
                },
                2: {
                    // draw
                    pool: 7777777.12398,
                    odd: 1.87,
                },
            },
            result: 0, // 白方獲勝
        },
    }),
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
        totalPool(poolStatus) {
            return Math.floor(
                Number(
                    poolStatus[0].pool +
                        poolStatus[1].pool +
                        poolStatus[2].pool,
                ),
            ).toLocaleString();
        },
        betBtnOnclick(winner) {
            this.selectedWinner = winner;
            this.isBetDialogActive = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.match-details {
    background-size: cover;
    background-position: center;
    background-image: url("/public/assets/imgs/views/matchDetails/match-details-bg.png");

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
}
</style>
