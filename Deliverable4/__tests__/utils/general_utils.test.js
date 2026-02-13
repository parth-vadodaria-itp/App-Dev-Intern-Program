import { formatTime } from "../../src/utils/generalUtils.js";

describe("test-cases for logic to format time in hh:mm:ss from seconds",() => {
    test("0s should show 00:00:00",() => {
        expect(formatTime(0)).toBe("00:00:00");
    });
    test("143s should show 00:02:23",() => {
        expect(formatTime(143)).toBe("00:02:23");
    });
    test("8274s should show 02:17:54",() => {
        expect(formatTime(8274)).toBe("02:17:54");
    });
    test("187340s should show 52:02:20",() => {
        expect(formatTime(187340)).toBe("52:02:20");
    });
});