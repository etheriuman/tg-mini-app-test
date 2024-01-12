import { apiHelper } from "@/utils/requestHelper.js";

export default {
    getMatches() {
        return apiHelper.get("");
    },
    getMatch() {
        return apiHelper.get("");
    },
};
