<template>
    <transition name="fade">
        <div
            v-if="isBetDialogActive"
            class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center p-4"
        >
            <!-- overlay -->
            <div
                @click="close"
                class="absolute left-0 top-0 z-[-1] h-full w-full bg-[#000] bg-opacity-60"
            ></div>
            <!-- dialog -->
            <div
                class="relative flex flex-col justify-center gap-6 rounded-xl bg-[#FFF] p-6"
            >
                <!-- close button -->
                <button
                    @click="close"
                    class="absolute right-4 top-4 h-6 w-6 rounded-full bg-[#F0F0F0]"
                >
                    <div
                        class="absolute inset-x-1/2 inset-y-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#FFF]"
                    ></div>
                    <div
                        class="absolute inset-x-1/2 inset-y-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 rotate-[135deg] bg-[#FFF]"
                    ></div>
                </button>
                <!-- selected winner -->
                <div class="flex w-full flex-col gap-3">
                    <span class="text-sm text-[#000]">Selected winner:</span>
                    <!-- selected winner label -->
                    <div class="flex w-full flex-col gap-2">
                        <div
                            class="relative flex h-[56px] w-full items-center gap-4 overflow-hidden rounded-lg p-2 px-6 py-2"
                            :class="{
                                'border-[1px] border-[#2252FF] bg-[#FFF]':
                                    selectedWinner === 0,
                                'bg-[#E84142]': selectedWinner === 1,
                                'bg-[#000]': selectedWinner === 2,
                            }"
                        >
                            <!-- pool -->
                            <div class="flex flex-grow flex-col items-center">
                                <span
                                    class="text-sm font-extrabold"
                                    :class="{
                                        'text-[#FFF]':
                                            selectedWinner === 1 ||
                                            selectedWinner === 2,
                                        'text-[#2252FF]': selectedWinner === 0,
                                    }"
                                    >{{
                                        selectedWinner === 2
                                            ? "Draw"
                                            : match.cocks[selectedWinner]
                                                  .bloodline
                                    }}</span
                                >
                                <div class="flex items-center gap-[2px]">
                                    <span
                                        class="text-xs"
                                        :class="{
                                            'text-[#FFF]':
                                                selectedWinner === 1 ||
                                                selectedWinner === 2,
                                            'text-[#2252FF]':
                                                selectedWinner === 0,
                                        }"
                                        >Pool:</span
                                    >
                                    <img
                                        class="h-[10px] w-[10px]"
                                        src="/assets/imgs/utils/token/COX.svg"
                                        alt=""
                                    />
                                    <span
                                        class="text-xs"
                                        :class="{
                                            'text-[#FFF]':
                                                selectedWinner === 1 ||
                                                selectedWinner === 2,
                                            'text-[#2252FF]':
                                                selectedWinner === 0,
                                        }"
                                        >{{
                                            Math.floor(
                                                Number(
                                                    match.currentPoolStatus[
                                                        selectedWinner
                                                    ].pool,
                                                ),
                                            ).toLocaleString()
                                        }}</span
                                    >
                                </div>
                            </div>
                            <!-- divider -->
                            <div class="h-[32px] w-[1px] bg-[#DDDFEC]"></div>
                            <!-- odd -->
                            <span
                                class="w-[72px] text-[32px] font-bold"
                                :class="{
                                    'text-[#FFF]':
                                        selectedWinner === 1 ||
                                        selectedWinner === 2,
                                    'text-[#2252FF]': selectedWinner === 0,
                                }"
                                >{{
                                    match.currentPoolStatus[selectedWinner].odd
                                }}</span
                            >
                        </div>
                    </div>
                    <!-- notice -->
                    <span class="text-xs text-[#AAA]"
                        >According to changes in the pool, the odds may
                        fluctuate</span
                    >
                </div>
                <!-- enter amount -->
                <div class="flex w-full flex-col gap-3">
                    <label for="amount" class="block text-sm text-[#000]"
                        >Enter amount you want to bet:</label
                    >
                    <!-- input and expected bonus -->
                    <div class="flex w-full flex-col gap-2">
                        <div class="relative border-b">
                            <div
                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                            >
                                <img
                                    src="/assets/imgs/utils/token/COX.svg"
                                    class="h-9 w-9"
                                    alt=""
                                />
                            </div>
                            <input
                                v-model="inputAmount"
                                type="text"
                                pattern="\d*"
                                name="amount"
                                class="block h-[52px] w-full border-0 pl-14 pr-20 text-[40px] font-extrabold text-[#E84142] ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                :placeholder="
                                    balance > 0 ? 0.0 : 'Balance is 0'
                                "
                                :class="{ 'text-[24px]': balance === 0 }"
                                :disabled="balance === 0"
                            />
                            <div
                                class="absolute inset-y-0 right-0 flex items-center"
                            >
                                <button
                                    @click="allBtnOnclick"
                                    v-if="balance !== 0"
                                    class="h-[32px] w-[64px] rounded-md bg-[#F0F0F0] text-sm font-extrabold text-[#E84142]"
                                >
                                    All
                                </button>
                                <button
                                    v-else
                                    class="h-[32px] w-[64px] rounded-md bg-[#E84142] text-sm font-extrabold text-[#F0F0F0]"
                                >
                                    Deposit
                                </button>
                            </div>
                        </div>
                        <!-- expected bonus -->
                        <div class="flex items-center gap-1">
                            <span class="text-sm text-[#AAA]"
                                >Expected bonus:</span
                            >
                            <span class="text-sm text-[#E84142]">{{
                                `${expectedBonus} COX`
                            }}</span>
                        </div>
                    </div>
                </div>
                <!-- confirm button -->
                <button
                    @click="confirmBtnOnclick"
                    class="h-[56px] rounded-lg bg-gradient-to-r from-[#184CFF] to-[#FF3838] text-lg font-bold text-[#FFF]"
                >
                    Confirm
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Bet",
    props: {
        match: {
            type: Object,
            default: null,
        },
        isBetDialogActive: {
            type: Boolean,
            default: false,
        },
        selectedWinner: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        balance: 500,
        inputAmount: null,
        expectedBonus: 0,
    }),
    watch: {
        isBetDialogActive() {
            this.inputAmount = null;
            this.expectedBonus = 0;
        },
        inputAmount(newVal, oldVal) {
            console.log("new input: ", newVal);

            const regex = /^[0-9]+$/;
            if ((newVal === null || newVal.length) && !newVal.match(regex)) {
                this.inputAmount = oldVal || 0;
                return;
            }
            this.updateExpectedBonus(Number(newVal));
        },
    },
    methods: {
        close() {
            this.$emit("update:isBetDialogActive", false);
        },
        updateExpectedBonus(inputAmount) {
            const totalPool =
                Number(this.match.currentPoolStatus[0].pool) +
                Number(this.match.currentPoolStatus[1].pool) +
                Number(this.match.currentPoolStatus[2].pool) +
                inputAmount;
            console.log("totalPool: ", totalPool);
            const winnerPool =
                Number(this.match.currentPoolStatus[this.selectedWinner].pool) +
                inputAmount;
            const expectedBonus = Math.floor(
                (Number(inputAmount) / winnerPool) * totalPool,
            );
            this.expectedBonus = expectedBonus;
        },
        allBtnOnclick() {
            this.inputAmount = Math.floor(this.balance);
        },
        confirmBtnOnclick() {
            if (this.inputAmount > this.balance) {
                // TODO 替換成正式 alert
                alert("not enough balance");
                return;
            }
            alert("confirm");
        },
    },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
