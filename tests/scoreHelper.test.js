const getScoreTone = require("../services/scoreHelper");

test("score 9 returns good", () => {
    expect(getScoreTone(9)).toBe("good");
});

test("score 6 returns warning", () => {
    expect(getScoreTone(6)).toBe("warning");
});

test("score 3 returns critical", () => {
    expect(getScoreTone(3)).toBe("critical");
});